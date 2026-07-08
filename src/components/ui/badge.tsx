import { StyleSheet, View, type ViewProps } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger";

type BadgeProps = ViewProps & {
  label: string;
  variant?: BadgeVariant;
};

export function Badge({ label, variant = "default", style, ...props }: BadgeProps) {
  const { colors, radius, spacing, fontSize } = useTheme();

  const variantStyle = {
    default: { backgroundColor: colors.card, color: colors.text, borderColor: colors.border },
    primary: {
      backgroundColor: colors.primary,
      color: colors.primaryText,
      borderColor: colors.primary,
    },
    success: {
      backgroundColor: colors.success,
      color: colors.primaryText,
      borderColor: colors.success,
    },
    warning: {
      backgroundColor: colors.warning,
      color: colors.primaryText,
      borderColor: colors.warning,
    },
    danger: {
      backgroundColor: colors.danger,
      color: colors.primaryText,
      borderColor: colors.danger,
    },
  }[variant];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: variantStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
          borderRadius: radius.full,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
        },
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: variantStyle.color,
          fontSize: fontSize.sm - 1,
          lineHeight: Math.round((fontSize.sm - 1) * 1.3),
        }}
        variant="label"
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    borderWidth: 1,
  },
});
