import { Text as RNText, StyleSheet, type TextProps } from "react-native";

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
    },
    body: { fontSize: fontSize.md, color: colors.text },
    muted: { fontSize: fontSize.sm, color: colors.muted },
    label: {
      fontSize: fontSize.sm,
      fontWeight: "600" as const,
      color: colors.text,
    },
  }[variant];

  return <RNText style={[styles.base, variantStyle, style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    lineHeight: 22,
  },
});
