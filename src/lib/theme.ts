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

export const lightColors = {
  bg: "#FFFFFF",
  card: "#F4F4F5",
  text: "#18181B",
  muted: "#71717A",
  primary: "#6366F1",
  primaryText: "#FFFFFF",
  danger: "#EF4444",
  border: "#E4E4E7",
  inputBg: "#FFFFFF",
} as const;

export const darkColors = {
  bg: "#09090B",
  card: "#18181B",
  text: "#FAFAFA",
  muted: "#A1A1AA",
  primary: "#818CF8",
  primaryText: "#FFFFFF",
  danger: "#F87171",
  border: "#27272A",
  inputBg: "#18181B",
} as const;

export type ThemeColors = {
  [K in keyof typeof lightColors]: string;
};
