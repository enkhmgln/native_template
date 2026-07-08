import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, type PressableProps } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type CheckboxProps = Omit<PressableProps, "children" | "style" | "onPress"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  ...props
}: CheckboxProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange(!checked)}
      style={({ pressed }) => [
        styles.row,
        { gap: spacing.sm, opacity: disabled ? 0.5 : pressed ? 0.8 : 1 },
      ]}
      {...props}
    >
      <View
        style={[
          styles.box,
          {
            backgroundColor: checked ? colors.primary : colors.inputBg,
            borderColor: checked ? colors.primary : colors.border,
            borderRadius: radius.sm,
          },
        ]}
      >
        {checked ? <Ionicons color={colors.primaryText} name="checkmark" size={16} /> : null}
      </View>
      {label ? (
        <Text style={styles.label} variant="body">
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    borderWidth: 1,
    height: 22,
    justifyContent: "center",
    width: 22,
  },
  label: {
    flex: 1,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
});
