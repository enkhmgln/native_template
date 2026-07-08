import { ActivityIndicator, StyleSheet, View, type ViewProps } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type SpinnerProps = ViewProps & {
  label?: string;
  size?: "small" | "large";
};

export function Spinner({ label, size = "small", style, ...props }: SpinnerProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <ActivityIndicator color={colors.primary} size={size} />
      {label ? (
        <Text style={{ marginTop: spacing.sm }} variant="muted">
          {label}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
});
