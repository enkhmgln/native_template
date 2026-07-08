import { StyleSheet, View, type ViewProps } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type EmptyStateProps = ViewProps & {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  style,
  ...props
}: EmptyStateProps) {
  const { spacing } = useTheme();

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <Text style={{ textAlign: "center" }} variant="title">
        {title}
      </Text>
      {description ? (
        <Text style={{ marginTop: spacing.xs, textAlign: "center" }} variant="muted">
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          onPress={onAction}
          style={{ marginTop: spacing.md, width: "100%" }}
          title={actionLabel}
          variant="ghost"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    width: "100%",
  },
});
