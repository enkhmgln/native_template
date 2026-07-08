import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type ChipProps = Omit<PressableProps, "children" | "style"> & {
  label: string;
  selected?: boolean;
  style?: ViewStyle;
};

export function Chip({ label, selected = false, style, ...props }: ChipProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected ? colors.primary : colors.card,
          borderColor: selected ? colors.primary : colors.border,
          borderRadius: radius.full,
          opacity: pressed ? 0.85 : 1,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        },
        style,
      ]}
      {...props}
    >
      <Text
        style={{ color: selected ? colors.primaryText : colors.text }}
        variant="label"
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
  },
});
