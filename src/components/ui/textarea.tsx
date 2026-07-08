import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type TextareaProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, style, ...props }: TextareaProps) {
  const { colors, radius, spacing, fontSize } = useTheme();

  return (
    <View style={styles.wrapper}>
      {label ? <Text variant="label">{label}</Text> : null}
      <TextInput
        multiline
        placeholderTextColor={colors.muted}
        style={[
          {
            backgroundColor: colors.inputBg,
            borderRadius: radius.md,
            color: colors.text,
            fontSize: fontSize.md,
            marginTop: label ? spacing.xs : 0,
            minHeight: 120,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm + 4,
            textAlignVertical: "top",
          },
          style,
        ]}
        {...props}
      />
      {error ? (
        <Text style={{ color: colors.danger, marginTop: spacing.xs }} variant="muted">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
});
