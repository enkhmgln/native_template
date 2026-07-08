import { Platform, Text as RNText, StyleSheet, type TextProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";

type TextVariant = "title" | "body" | "muted" | "label";

type AppTextProps = TextProps & {
  variant?: TextVariant;
};

export function Text({ variant = "body", style, ...props }: AppTextProps) {
  const { colors, fontSize } = useTheme();

  const variantStyle = {
    title: {
      fontSize: fontSize.xl,
      fontWeight: "700" as const,
      color: colors.text,
      lineHeight: Math.round(fontSize.xl * 1.25),
    },
    body: {
      fontSize: fontSize.md,
      color: colors.text,
      lineHeight: Math.round(fontSize.md * 1.4),
    },
    muted: {
      fontSize: fontSize.sm,
      color: colors.muted,
      lineHeight: Math.round(fontSize.sm * 1.4),
    },
    label: {
      fontSize: fontSize.sm,
      fontWeight: "600" as const,
      color: colors.text,
      lineHeight: Math.round(fontSize.sm * 1.4),
    },
  }[variant];

  return (
    <RNText
      style={[
        Platform.OS === "android" && styles.android,
        variantStyle,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  android: {
    includeFontPadding: false,
  },
});
