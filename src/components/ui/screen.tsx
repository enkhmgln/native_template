import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type ViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/use-theme";

type ScreenProps = ViewProps & {
  scroll?: boolean;
  padded?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  scrollProps?: Omit<ScrollViewProps, "children" | "refreshControl">;
};

export function Screen({
  scroll = false,
  padded = true,
  refreshing = false,
  onRefresh,
  style,
  children,
  scrollProps,
  ...props
}: ScreenProps) {
  const { colors, spacing } = useTheme();

  const content = (
    <View
      style={[
        padded && { padding: spacing.md },
        scroll ? styles.scrollInner : styles.content,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            onRefresh ? (
              <RefreshControl
                colors={[colors.primary]}
                onRefresh={onRefresh}
                refreshing={refreshing}
                tintColor={colors.primary}
              />
            ) : undefined
          }
          showsVerticalScrollIndicator={false}
          {...scrollProps}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollInner: {
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
