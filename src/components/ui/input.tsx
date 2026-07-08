import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";
import { fonts } from "@/lib/theme";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, style, ...props }: InputProps) {
  const { colors, radius, spacing, fontSize } = useTheme();

  return (
    <View style={styles.wrapper}>
      {label ? <Text variant="label">{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.muted}
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBg,
            borderRadius: radius.md,
            color: colors.text,
            fontFamily: fonts.regular,
            fontSize: fontSize.md,
            marginTop: label ? spacing.xs : 0,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm + 4,
          },
          style,
        ]}
        {...props}
      />
      {error ? (
        <Text
          style={{ color: colors.danger, marginTop: spacing.xs }}
          variant="muted"
        >
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
  input: {
    minHeight: 48,
  },
});
