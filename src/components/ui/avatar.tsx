import { Image, StyleSheet, View, type ImageSourcePropType } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  name?: string;
  source?: ImageSourcePropType;
  size?: AvatarSize;
};

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 56,
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ name = "User", source, size = "md" }: AvatarProps) {
  const { colors, radius } = useTheme();
  const dimension = sizeMap[size];

  if (source) {
    return (
      <Image
        source={source}
        style={[
          styles.image,
          {
            borderColor: colors.border,
            borderRadius: radius.full,
            height: dimension,
            width: dimension,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        {
          backgroundColor: colors.primary,
          borderRadius: radius.full,
          height: dimension,
          width: dimension,
        },
      ]}
    >
      <Text
        style={{
          color: colors.primaryText,
          fontSize: size === "lg" ? 20 : size === "md" ? 16 : 13,
        }}
        variant="body"
        weight="bold"
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderWidth: 1,
  },
});
