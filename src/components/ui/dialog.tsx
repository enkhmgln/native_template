import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Modal, Pressable, StyleSheet, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";
import type { FeedbackVariant } from "@/lib/theme";

const dialogLottie = {
  success: require("@/assets/lottie/alert-success.json"),
  warning: require("@/assets/lottie/alert-warning.json"),
  error: require("@/assets/lottie/alert-error.json"),
} as const;

export type DialogMode = "alert" | "confirm";

type DialogProps = {
  visible: boolean;
  mode: DialogMode;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant: FeedbackVariant;
  onConfirm: () => void;
  onCancel: () => void;
};

function getDefaultTitle(mode: DialogMode, variant: FeedbackVariant) {
  if (mode === "confirm") {
    return "Баталгаажуулах уу?";
  }

  switch (variant) {
    case "success":
      return "Амжилттай";
    case "warning":
      return "Анхаарна уу";
    case "error":
      return "Алдаа";
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function getLottieSource(variant: FeedbackVariant) {
  switch (variant) {
    case "success":
      return dialogLottie.success;
    case "warning":
      return dialogLottie.warning;
    case "error":
      return dialogLottie.error;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function getConfirmVariant(variant: FeedbackVariant) {
  switch (variant) {
    case "error":
      return "danger" as const;
    case "warning":
      return "secondary" as const;
    case "success":
      return "primary" as const;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function DialogIcon({
  variant,
  visible,
}: {
  variant: FeedbackVariant;
  visible: boolean;
}) {
  const lottieRef = useRef<LottieView>(null);
  const lottieSource = getLottieSource(variant);

  useEffect(() => {
    if (!visible) {
      return;
    }

    lottieRef.current?.reset();
    lottieRef.current?.play();
  }, [lottieSource, visible]);

  return (
    <View style={styles.lottieWrap}>
      <LottieView
        ref={lottieRef}
        loop={false}
        source={lottieSource}
        style={styles.lottie}
      />
    </View>
  );
}

export function Dialog({
  visible,
  mode,
  title,
  message,
  confirmLabel,
  cancelLabel = "Цуцлах",
  variant,
  onConfirm,
  onCancel,
}: DialogProps) {
  const { colors, fontSize, isDark, radius, spacing } = useTheme();
  const [opacity] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.92));
  const isAlert = mode === "alert";
  const resolvedConfirmLabel =
    confirmLabel ?? (isAlert ? "Ойлголоо" : "Батлах");
  const resolvedTitle = title ?? getDefaultTitle(mode, variant);

  useEffect(() => {
    if (!visible) {
      return;
    }

    opacity.setValue(0);
    scale.setValue(0.92);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 8,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, visible]);

  const handleDismiss = isAlert ? onConfirm : onCancel;

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleDismiss}
      transparent
      visible={visible}
    >
      <Pressable
        onPress={handleDismiss}
        style={[styles.overlay, { backgroundColor: colors.overlay }]}
      >
        <Animated.View
          style={[styles.cardWrap, { opacity, transform: [{ scale }] }]}
        >
          <Pressable
            accessibilityRole="alert"
            accessible
            onPress={(event) => event.stopPropagation()}
            style={[
              styles.card,
              isDark ? styles.cardShadowDark : styles.cardShadowLight,
              {
                backgroundColor: isDark ? colors.card : colors.bg,
                borderColor: colors.border,
                borderRadius: radius.lg,
                padding: spacing.lg,
              },
            ]}
          >
            <DialogIcon variant={variant} visible={visible} />

            <Text
              style={[
                styles.title,
                {
                  fontSize: fontSize.lg,
                  lineHeight: Math.round(fontSize.lg * 1.35),
                  marginTop: spacing.sm,
                },
              ]}
              variant="label"
            >
              {resolvedTitle}
            </Text>
            {message ? (
              <Text
                style={{
                  fontSize: fontSize.sm,
                  lineHeight: Math.round(fontSize.sm * 1.45),
                  marginTop: spacing.xs + 2,
                  textAlign: "center",
                }}
                variant="muted"
              >
                {message}
              </Text>
            ) : null}

            <View
              style={[
                styles.actions,
                { gap: spacing.sm, marginTop: spacing.md + 4 },
              ]}
            >
              {isAlert ? (
                <Button
                  onPress={onConfirm}
                  style={styles.actionFull}
                  title={resolvedConfirmLabel}
                  variant={getConfirmVariant(variant)}
                />
              ) : (
                <>
                  <Button
                    onPress={onCancel}
                    style={styles.action}
                    title={cancelLabel}
                    variant="ghost"
                  />
                  <Button
                    onPress={onConfirm}
                    style={styles.action}
                    title={resolvedConfirmLabel}
                    variant={getConfirmVariant(variant)}
                  />
                </>
              )}
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  action: {
    flex: 1,
  },
  actionFull: {
    width: "100%",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
  },
  card: {
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    width: "100%",
  },
  cardShadowDark: {
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.55,
    shadowRadius: 28,
  },
  cardShadowLight: {
    elevation: 14,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 32,
  },
  cardWrap: {
    maxWidth: 360,
    width: "100%",
  },
  lottie: {
    height: 104,
    width: 104,
  },
  lottieWrap: {
    alignItems: "center",
    height: 104,
    justifyContent: "center",
    width: 104,
  },
  overlay: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    textAlign: "center",
  },
});
