import { StyleSheet, View, type ViewProps } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type DividerProps = ViewProps & {
  label?: string;
};

export function Divider({ label, style, ...props }: DividerProps) {
  const { colors, spacing } = useTheme();

  if (!label) {
    return (
      <View
        style={[
          styles.line,
          { backgroundColor: colors.border, marginVertical: spacing.sm },
          style,
        ]}
        {...props}
      />
    );
  }

  return (
    <View
      style={[styles.labeled, { marginVertical: spacing.sm }, style]}
      {...props}
    >
      <View style={[styles.line, { backgroundColor: colors.border, flex: 1 }]} />
      <Text style={{ marginHorizontal: spacing.sm }} variant="muted">
        {label}
      </Text>
      <View style={[styles.line, { backgroundColor: colors.border, flex: 1 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  labeled: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  line: {
    height: StyleSheet.hairlineWidth,
  },
});
