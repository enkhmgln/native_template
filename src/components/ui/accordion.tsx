import { Ionicons } from "@expo/vector-icons";
import { createContext, useContext, useState, type PropsWithChildren, type ReactNode } from "react";
import { LayoutAnimation, Platform, Pressable, StyleSheet, UIManager, View } from "react-native";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  openValues: string[];
  toggle: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionItem must be used within Accordion");
  }
  return context;
}

type AccordionProps = PropsWithChildren<{
  type?: AccordionType;
  defaultValue?: string[];
}>;

export function Accordion({ type = "single", defaultValue = [], children }: AccordionProps) {
  const { spacing } = useTheme();
  const [openValues, setOpenValues] = useState(defaultValue);

  const toggle = (value: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenValues((current) => {
      const isOpen = current.includes(value);
      if (type === "single") {
        return isOpen ? [] : [value];
      }
      return isOpen ? current.filter((item) => item !== value) : [...current, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggle }}>
      <View style={[styles.root, { gap: spacing.sm }]}>{children}</View>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = PropsWithChildren<{
  value: string;
  title: string;
}>;

export function AccordionItem({ value, title, children }: AccordionItemProps) {
  const { colors, radius, spacing } = useTheme();
  const { openValues, toggle } = useAccordionContext();
  const isOpen = openValues.includes(value);

  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: colors.card,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.md,
        },
      ]}
    >
      <Pressable
        onPress={() => toggle(value)}
        style={[styles.trigger, { paddingVertical: spacing.sm + 4 }]}
      >
        <Text style={styles.title} variant="label">
          {title}
        </Text>
        <Ionicons color={colors.muted} name={isOpen ? "chevron-up" : "chevron-down"} size={18} />
      </Pressable>
      {isOpen ? <View style={{ paddingBottom: spacing.md }}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    overflow: "hidden",
    width: "100%",
  },
  root: {
    width: "100%",
  },
  title: {
    flex: 1,
  },
  trigger: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
});
