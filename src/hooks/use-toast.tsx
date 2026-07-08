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
import { Animated, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";
import type { ThemeColors } from "@/lib/theme";

export type ToastVariant = "default" | "success" | "error";

type ToastState = {
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  show: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 2800;

function getToastStyle(variant: ToastVariant, colors: ThemeColors) {
  switch (variant) {
    case "success":
      return {
        icon: "checkmark-circle" as const,
        iconBg: `${colors.success}18`,
        iconColor: colors.success,
      };
    case "error":
      return {
        icon: "alert-circle" as const,
        iconBg: `${colors.danger}18`,
        iconColor: colors.danger,
      };
    default:
      return {
        icon: "information-circle" as const,
        iconBg: `${colors.primary}18`,
        iconColor: colors.primary,
      };
  }
}

function ToastHost({ toast, onHide }: { toast: ToastState | null; onHide: () => void }) {
  const { colors, radius, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;
  const scale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    if (!toast) {
      return;
    }

    opacity.setValue(0);
    translateY.setValue(-12);
    scale.setValue(0.96);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 240, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, friction: 9, tension: 80, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 8, tension: 100, useNativeDriver: true }),
      ]),
      Animated.delay(TOAST_DURATION_MS),
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -8, duration: 200, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.98, duration: 200, useNativeDriver: true }),
      ]),
    ]).start(({ finished }) => {
      if (finished) {
        onHide();
      }
    });
  }, [onHide, opacity, scale, toast, translateY]);

  if (!toast) {
    return null;
  }

  const feedback = getToastStyle(toast.variant, colors);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.host,
        {
          opacity,
          paddingHorizontal: spacing.lg,
          top: insets.top + spacing.sm,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <View
        style={[
          styles.toast,
          {
            backgroundColor: colors.bg,
            borderColor: colors.border,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm + 2,
            shadowColor: colors.text,
          },
        ]}
      >
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: feedback.iconBg,
              borderRadius: radius.full,
            },
          ]}
        >
          <Ionicons color={feedback.iconColor} name={feedback.icon} size={20} />
        </View>
        <Text numberOfLines={3} style={styles.message} variant="label">
          {toast.message}
        </Text>
      </View>
    </Animated.View>
  );
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const hide = useCallback(() => {
    setToast(null);
  }, []);

  const show = useCallback((message: string, variant: ToastVariant = "default") => {
    setToast({ message, variant });
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastHost toast={toast} onHide={hide} />
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
  iconWrap: {
    alignItems: "center",
    flexShrink: 0,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  message: {
    flex: 1,
    flexShrink: 1,
  },
  toast: {
    alignItems: "center",
    alignSelf: "center",
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 6,
    flexDirection: "row",
    gap: 12,
    maxWidth: 400,
    minHeight: 52,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    width: "100%",
  },
});
