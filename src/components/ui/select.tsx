import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Sheet } from "@/components/ui/sheet";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
  sheetTitle?: string;
};

export function Select({
  label,
  placeholder = "Сонгох...",
  options,
  value,
  onValueChange,
  error,
  sheetTitle,
}: SelectProps) {
  const { colors, radius, spacing, fontSize } = useTheme();
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(
    () => options.find((option) => option.value === value)?.label,
    [options, value],
  );

  const handleSelect = (nextValue: string) => {
    onValueChange(nextValue);
    setOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text variant="label">{label}</Text> : null}
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.field,
          {
            backgroundColor: colors.inputBg,
            borderRadius: radius.md,
            marginTop: label ? spacing.xs : 0,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm + 4,
          },
        ]}
      >
        <Text
          style={{
            color: selectedLabel ? colors.text : colors.muted,
            flex: 1,
            fontSize: fontSize.md,
          }}
          variant="body"
        >
          {selectedLabel ?? placeholder}
        </Text>
        <Ionicons color={colors.muted} name="chevron-down" size={18} />
      </Pressable>
      {error ? (
        <Text style={{ color: colors.danger, marginTop: spacing.xs }} variant="muted">
          {error}
        </Text>
      ) : null}

      <Sheet onClose={() => setOpen(false)} title={sheetTitle ?? label} visible={open}>
        <View style={{ gap: spacing.xs }}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <Pressable
                key={option.value}
                onPress={() => handleSelect(option.value)}
                style={({ pressed }) => [
                  styles.option,
                  {
                    backgroundColor: isSelected ? `${colors.primary}14` : pressed ? colors.card : "transparent",
                    borderRadius: radius.md,
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm + 4,
                  },
                ]}
              >
                <Text
                  style={{ color: isSelected ? colors.primary : colors.text, fontWeight: isSelected ? "600" : "400" }}
                  variant="body"
                >
                  {option.label}
                </Text>
                {isSelected ? <Ionicons color={colors.primary} name="checkmark" size={20} /> : null}
              </Pressable>
            );
          })}
        </View>
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 48,
    width: "100%",
  },
  option: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  wrapper: {
    width: "100%",
  },
});
