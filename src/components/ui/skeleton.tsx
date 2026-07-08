import { StyleSheet, View, type ViewProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";

type SkeletonProps = ViewProps & {
  width?: number | `${number}%`;
  height?: number;
  circle?: boolean;
};

export function Skeleton({
  width = "100%",
  height = 16,
  circle = false,
  style,
  ...props
}: SkeletonProps) {
  const { colors, radius } = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.border,
          borderRadius: circle ? radius.full : radius.sm,
          height: circle ? (typeof width === "number" ? width : height) : height,
          width,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    opacity: 0.7,
  },
});
