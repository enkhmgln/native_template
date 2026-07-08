import { useEffect, useRef, type PropsWithChildren } from "react";
import { Animated, Modal, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";

type SheetProps = PropsWithChildren<{
  visible: boolean;
  title?: string;
  onClose: () => void;
}>;

export function Sheet({ visible, title, onClose, children }: SheetProps) {
  const { colors, isDark, radius, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(400)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      return;
    }

    translateY.setValue(400);
    overlayOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 9,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [overlayOpacity, translateY, visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 400,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onClose();
      }
    });
  };

  return (
    <Modal
      animationType="none"
      onRequestClose={handleClose}
      transparent
      visible={visible}
    >
      <View style={styles.root}>
        <Pressable onPress={handleClose} style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.overlay,
              { backgroundColor: colors.overlay, opacity: overlayOpacity },
            ]}
          />
        </Pressable>
        <Animated.View
          style={[
            styles.panel,
            isDark ? styles.panelShadowDark : styles.panelShadowLight,
            {
              backgroundColor: isDark ? colors.card : colors.bg,
              borderTopLeftRadius: radius.lg,
              borderTopRightRadius: radius.lg,
              paddingBottom: insets.bottom + spacing.md,
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={[styles.handle, { backgroundColor: colors.border }]} />
          {title ? (
            <Text
              style={[
                styles.title,
                { marginBottom: spacing.sm, paddingHorizontal: spacing.lg },
              ]}
              variant="label"
            >
              {title}
            </Text>
          ) : null}
          <View style={{ paddingHorizontal: spacing.lg }}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  handle: {
    alignSelf: "center",
    borderRadius: 999,
    height: 4,
    marginBottom: 12,
    marginTop: 8,
    width: 40,
  },
  overlay: {
    flex: 1,
  },
  panel: {
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    maxHeight: "80%",
    width: "100%",
  },
  panelShadowDark: {
    elevation: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
  },
  panelShadowLight: {
    elevation: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
  },
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    textAlign: "center",
  },
});
