import { Switch as RNSwitch, type SwitchProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";

type AppSwitchProps = SwitchProps;

export function Switch({ value, onValueChange, ...props }: AppSwitchProps) {
  const { colors } = useTheme();

  return (
    <RNSwitch
      onValueChange={onValueChange}
      thumbColor={colors.primaryText}
      trackColor={{ false: colors.border, true: colors.primary }}
      value={value}
      {...props}
    />
  );
}
