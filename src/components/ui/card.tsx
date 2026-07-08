import { StyleSheet, View, type ViewProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";

type CardProps = ViewProps;

export function Card({ style, children, ...props }: CardProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.card,
          borderRadius: radius.lg,
          padding: spacing.md,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
  },
});
