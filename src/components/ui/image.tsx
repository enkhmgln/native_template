import { Image as ExpoImage, type ImageProps as ExpoImageProps } from "expo-image";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { radius as radiusTokens } from "@/lib/theme";

type ImageRadius = keyof typeof radiusTokens;

type AppImageProps = Omit<ExpoImageProps, "style"> & {
  radius?: ImageRadius;
  style?: StyleProp<ViewStyle>;
};

export function Image({ radius = "md", style, ...props }: AppImageProps) {
  const { colors, radius: themeRadius } = useTheme();

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: themeRadius[radius],
        },
        style,
      ]}
    >
      <ExpoImage
        contentFit="cover"
        style={[styles.image, { borderRadius: themeRadius[radius] }]}
        transition={200}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  wrap: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
    width: "100%",
  },
});
