import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from "react-native";

import { useTheme } from "@/hooks/use-theme";

type IconButtonProps = Omit<PressableProps, "children" | "style"> & {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  variant?: "default" | "ghost" | "danger";
  style?: ViewStyle;
};

export function IconButton({
  name,
  size = 20,
  variant = "default",
  disabled,
  style,
  ...props
}: IconButtonProps) {
  const { colors, radius, spacing } = useTheme();

  const variantStyle = {
    default: { backgroundColor: colors.card, borderColor: colors.border, iconColor: colors.text },
    ghost: { backgroundColor: "transparent", borderColor: "transparent", iconColor: colors.text },
    danger: { backgroundColor: colors.danger, borderColor: colors.danger, iconColor: colors.primaryText },
  }[variant];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: variantStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
          borderRadius: radius.md,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          padding: spacing.sm,
        },
        style,
      ]}
      {...props}
    >
      <Ionicons color={variantStyle.iconColor} name={name} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
  },
});
