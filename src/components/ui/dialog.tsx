import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";
import type { FeedbackVariant, ThemeColors } from "@/lib/theme";

type DialogProps = {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: FeedbackVariant;
  onConfirm: () => void;
  onCancel: () => void;
};

function getDialogStyle(variant: FeedbackVariant, colors: ThemeColors) {
  switch (variant) {
    case "success":
      return {
        icon: "checkmark-circle" as const,
        iconBg: `${colors.success}22`,
        iconColor: colors.success,
      };
    case "warning":
      return {
        icon: "warning" as const,
        iconBg: `${colors.warning}22`,
        iconColor: colors.warning,
      };
    case "danger":
      return {
        icon: "alert-circle" as const,
        iconBg: `${colors.danger}22`,
        iconColor: colors.danger,
      };
    default:
      return {
        icon: "information-circle" as const,
        iconBg: `${colors.primary}22`,
        iconColor: colors.primary,
      };
  }
}

function getConfirmVariant(variant: FeedbackVariant) {
  switch (variant) {
    case "danger":
      return "danger" as const;
    case "warning":
      return "secondary" as const;
    case "success":
      return "primary" as const;
    default:
      return "primary" as const;
  }
}

export function Dialog({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}: DialogProps) {
  const { colors, radius, spacing } = useTheme();
  const feedback = getDialogStyle(variant, colors);

  return (
    <Modal animationType="fade" onRequestClose={onCancel} transparent visible={visible}>
      <Pressable onPress={onCancel} style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <Pressable
          onPress={(event) => event.stopPropagation()}
          style={[
            styles.card,
            {
              backgroundColor: colors.bg,
              borderColor: colors.border,
              borderRadius: radius.lg,
              padding: spacing.lg,
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
            <Ionicons color={feedback.iconColor} name={feedback.icon} size={28} />
          </View>

          <Text style={[styles.title, { marginTop: spacing.md }]} variant="title">
            {title}
          </Text>
          {message ? (
            <Text style={{ marginTop: spacing.sm, textAlign: "center" }} variant="muted">
              {message}
            </Text>
          ) : null}

          <View style={[styles.actions, { gap: spacing.sm, marginTop: spacing.lg }]}>
            <Button onPress={onCancel} style={styles.action} title={cancelLabel} variant="ghost" />
            <Button
              onPress={onConfirm}
              style={styles.action}
              title={confirmLabel}
              variant={getConfirmVariant(variant)}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  action: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    width: "100%",
  },
  card: {
    alignItems: "center",
    borderWidth: 1,
    elevation: 12,
    maxWidth: 360,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    width: "100%",
  },
  iconWrap: {
    alignItems: "center",
    height: 56,
    justifyContent: "center",
    width: 56,
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
