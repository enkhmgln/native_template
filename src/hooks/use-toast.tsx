import { Ionicons } from "@expo/vector-icons";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import {
  AccessibilityInfo,
  Animated,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";
import type { ThemeColors } from "@/lib/theme";

export type ToastVariant = "default" | "success" | "error";

type ToastState = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  show: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 3200;
const SWIPE_DISMISS_THRESHOLD = 24;

function getToastStyle(variant: ToastVariant, colors: ThemeColors) {
  switch (variant) {
    case "success":
      return {
        icon: "checkmark-circle" as const,
        tint: colors.success,
      };
    case "error":
      return {
        icon: "alert-circle" as const,
        tint: colors.danger,
      };
    default:
      return {
        icon: "information-circle" as const,
        tint: colors.primary,
      };
  }
}

function ToastHost({
  toast,
  onHide,
}: {
  toast: ToastState | null;
  onHide: () => void;
}) {
  const { colors, isDark, radius, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-16)).current;
  const scale = useRef(new Animated.Value(0.96)).current;
  const reduceMotion = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }

    if (reduceMotion.current) {
      opacity.setValue(0);
      onHide();
      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -24,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onHide();
      }
    });
  }, [onHide, opacity, scale, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        gesture.dy < -6 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) {
          translateY.setValue(gesture.dy);
          opacity.setValue(Math.max(0, 1 + gesture.dy / 80));
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -SWIPE_DISMISS_THRESHOLD) {
          dismiss();
        } else {
          Animated.parallel([
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 120,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (!toast) {
      return;
    }

    let cancelled = false;

    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (cancelled) {
        return;
      }
      reduceMotion.current = enabled;

      if (enabled) {
        opacity.setValue(1);
        translateY.setValue(0);
        scale.setValue(1);
      } else {
        opacity.setValue(0);
        translateY.setValue(-16);
        scale.setValue(0.96);
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 260,
            useNativeDriver: true,
          }),
          Animated.spring(translateY, {
            toValue: 0,
            friction: 9,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            friction: 8,
            tension: 120,
            useNativeDriver: true,
          }),
        ]).start();
      }

      hideTimer.current = setTimeout(() => dismiss(), TOAST_DURATION_MS);
    });

    return () => {
      cancelled = true;
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };
  }, [dismiss, opacity, scale, toast, translateY]);

  if (!toast) {
    return null;
  }

  const feedback = getToastStyle(toast.variant, colors);

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.host,
        { paddingHorizontal: spacing.lg, top: insets.top + spacing.sm },
      ]}
    >
      <Animated.View
        {...panResponder.panHandlers}
        accessibilityLiveRegion={
          toast.variant === "error" ? "assertive" : "polite"
        }
        accessibilityRole="alert"
        accessible
        style={[
          styles.toast,
          isDark ? styles.toastShadowDark : styles.toastShadowLight,
          {
            backgroundColor: isDark ? colors.card : colors.bg,
            borderColor: colors.border,
            borderRadius: radius.lg,
            opacity,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm + 2,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <Ionicons
          color={feedback.tint}
          name={feedback.icon}
          size={22}
          style={styles.icon}
        />
        <Text numberOfLines={3} style={styles.message} variant="label">
          {toast.message}
        </Text>
      </Animated.View>
    </View>
  );
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const hide = useCallback(() => {
    setToast(null);
  }, []);

  const show = useCallback(
    (message: string, variant: ToastVariant = "default") => {
      setToast({ id: Date.now(), message, variant });
    },
    [],
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastHost key={toast?.id} toast={toast} onHide={hide} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

const styles = StyleSheet.create({
  host: {
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 100,
  },
  icon: {
    flexShrink: 0,
  },
  message: {
    flex: 1,
    flexShrink: 1,
  },
  toast: {
    alignItems: "center",
    alignSelf: "center",
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: 12,
    maxWidth: 440,
    minHeight: 54,
    width: "100%",
  },
  toastShadowDark: {
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  toastShadowLight: {
    elevation: 10,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
});
