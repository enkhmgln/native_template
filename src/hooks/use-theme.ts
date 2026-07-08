import { useColorScheme } from "react-native";

import {
  darkColors,
  fontSize,
  lightColors,
  radius,
  spacing,
  type ThemeColors,
} from "@/lib/theme";

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const colors: ThemeColors = isDark ? darkColors : lightColors;

  return { colors, isDark, spacing, radius, fontSize };
}
