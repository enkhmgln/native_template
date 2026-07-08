export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const;

export const fontSize = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
} as const;

export const fonts = {
  thin: "GIP-Thin",
  ultraLight: "GIP-UltraLight",
  light: "GIP-Light",
  regular: "GIP-Regular",
  medium: "GIP-Medium",
  semibold: "GIP-SemiBold",
  bold: "GIP-Bold",
  extraBold: "GIP-ExtraBold",
  heavy: "GIP-Heavy",
  black: "GIP-Black",
} as const;

export type FontWeight = keyof typeof fonts;

export type TextVariant = "title" | "body" | "muted" | "label";

const variantWeights = {
  title: "bold",
  body: "regular",
  muted: "regular",
  label: "semibold",
} as const satisfies Record<TextVariant, FontWeight>;

export function resolveFontFamily(
  variant: TextVariant,
  weight?: FontWeight,
): string {
  return fonts[weight ?? variantWeights[variant]];
}

export const lightColors = {
  bg: "#FFFFFF",
  card: "#F4F4F5",
  text: "#18181B",
  muted: "#71717A",
  primary: "#6366F1",
  primaryText: "#FFFFFF",
  secondary: "#64748B",
  secondaryText: "#FFFFFF",
  danger: "#EF4444",
  border: "#E4E4E7",
  inputBg: "#FFFFFF",
  success: "#16A34A",
  warning: "#D97706",
  overlay: "rgba(15, 23, 42, 0.45)",
} as const;

export const darkColors = {
  bg: "#09090B",
  card: "#18181B",
  text: "#FAFAFA",
  muted: "#A1A1AA",
  primary: "#818CF8",
  primaryText: "#FFFFFF",
  secondary: "#94A3B8",
  secondaryText: "#0F172A",
  danger: "#F87171",
  border: "#27272A",
  inputBg: "#18181B",
  success: "#4ADE80",
  warning: "#FBBF24",
  overlay: "rgba(0, 0, 0, 0.6)",
} as const;

export type ThemeColors = {
  [K in keyof typeof lightColors]: string;
};

export type FeedbackVariant = "success" | "warning" | "error";
