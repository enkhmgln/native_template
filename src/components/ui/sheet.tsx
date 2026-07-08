import { BottomSheet, RNHostView } from "@expo/ui";
import { type PropsWithChildren } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

/** Universal BottomSheet applies 16pt leading/trailing padding natively. */
const SHEET_HORIZONTAL_INSET = 16;

type SheetProps = PropsWithChildren<{
  visible: boolean;
  title?: string;
  onClose: () => void;
}>;

export function Sheet({ visible, title, onClose, children }: SheetProps) {
  const { fontSize, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = windowWidth - SHEET_HORIZONTAL_INSET * 2;

  return (
    <BottomSheet isPresented={visible} onDismiss={onClose}>
      <RNHostView matchContents>
        <View
          style={[
            styles.content,
            {
              paddingBottom: Math.max(insets.bottom, spacing.md),
              width: contentWidth,
            },
          ]}
        >
          {title ? (
            <Text
              style={[
                styles.title,
                {
                  fontSize: fontSize.md,
                  lineHeight: Math.round(fontSize.md * 1.35),
                  marginBottom: spacing.lg,
                  marginTop: spacing.xs,
                },
              ]}
              variant="label"
            >
              {title}
            </Text>
          ) : null}
          <View style={styles.body}>{children}</View>
        </View>
      </RNHostView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "stretch",
  },
  content: {
    alignItems: "stretch",
  },
  title: {
    letterSpacing: -0.2,
    textAlign: "center",
  },
});
