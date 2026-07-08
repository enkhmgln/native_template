import { Platform, Text as RNText, StyleSheet, type TextProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import {
  resolveFontFamily,
  type FontWeight,
  type TextVariant,
} from "@/lib/theme";

type AppTextProps = TextProps & {
  variant?: TextVariant;
  weight?: FontWeight;
};

export function Text({
  variant = "body",
  weight,
  style,
  ...props
}: AppTextProps) {
  const { colors, fontSize } = useTheme();

  const variantStyle = {
    title: {
      fontFamily: resolveFontFamily("title", weight),
      fontSize: fontSize.xl,
      color: colors.text,
      lineHeight: Math.round(fontSize.xl * 1.25),
    },
    body: {
      fontFamily: resolveFontFamily("body", weight),
      fontSize: fontSize.md,
      color: colors.text,
      lineHeight: Math.round(fontSize.md * 1.4),
    },
    muted: {
      fontFamily: resolveFontFamily("muted", weight),
      fontSize: fontSize.sm,
      color: colors.muted,
      lineHeight: Math.round(fontSize.sm * 1.4),
    },
    label: {
      fontFamily: resolveFontFamily("label", weight),
      fontSize: fontSize.sm,
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
