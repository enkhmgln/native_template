import { createContext, useContext, type PropsWithChildren, type ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs");
  }
  return context;
}

type TabsProps = PropsWithChildren<{
  value: string;
  onValueChange: (value: string) => void;
}>;

export function Tabs({ value, onValueChange, children }: TabsProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <View
        style={[
          styles.root,
          {
            backgroundColor: colors.card,
            borderRadius: radius.lg,
            gap: spacing.md,
            padding: spacing.md,
          },
        ]}
      >
        {children}
      </View>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: PropsWithChildren) {
  const { spacing } = useTheme();

  return <View style={[styles.list, { gap: spacing.xs }]}>{children}</View>;
}

type TabsTriggerProps = {
  value: string;
  children: ReactNode;
};

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { colors, radius, spacing } = useTheme();
  const { value: activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <Pressable
      onPress={() => onValueChange(value)}
      style={[
        styles.trigger,
        {
          backgroundColor: isActive ? colors.bg : "transparent",
          borderRadius: radius.sm,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        },
      ]}
    >
      <Text
        style={{ color: isActive ? colors.text : colors.muted, fontWeight: isActive ? "600" : "400" }}
        variant="label"
      >
        {children}
      </Text>
    </Pressable>
  );
}

type TabsContentProps = PropsWithChildren<{
  value: string;
}>;

export function TabsContent({ value, children }: TabsContentProps) {
  const { value: activeValue } = useTabsContext();

  if (activeValue !== value) {
    return null;
  }

  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
  },
  list: {
    flexDirection: "row",
    width: "100%",
  },
  root: {
    overflow: "hidden",
    width: "100%",
  },
  trigger: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
