import Constants from "expo-constants";
import { Alert, Linking, Pressable, StyleSheet, View } from "react-native";

import { Button, Card, Screen, Text } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";

type SettingsRowProps = {
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
};

function SettingsRow({ label, value, onPress, destructive }: SettingsRowProps) {
  const { colors, spacing } = useTheme();

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          borderBottomColor: colors.border,
          opacity: pressed && onPress ? 0.7 : 1,
          paddingVertical: spacing.sm + 4,
        },
      ]}
    >
      <Text
        style={destructive ? { color: colors.danger } : undefined}
        variant="body"
      >
        {label}
      </Text>
      {value ? <Text variant="muted">{value}</Text> : null}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { spacing } = useTheme();
  const appVersion = Constants.expoConfig?.version ?? "1.0.0";

  function handleSignOut() {
    Alert.alert("Sign out", "Auth is not wired up yet.");
  }

  function openLink(url: string) {
    void Linking.openURL(url);
  }

  return (
    <Screen scroll>
      <Text variant="title">Settings</Text>
      <Text style={{ marginTop: spacing.xs }} variant="muted">
        Template settings screen — copy per app.
      </Text>

      <Card style={{ marginTop: spacing.lg }}>
        <Text variant="label">App</Text>
        <SettingsRow label="Version" value={appVersion} />
        <SettingsRow label="Theme" value="System" />
      </Card>
      <Text variant="title">Settings</Text>

      <Card style={{ marginTop: spacing.md }}>
        <Text variant="label">Account</Text>
        <SettingsRow
          label="Profile"
          onPress={() => Alert.alert("Coming soon")}
        />
        <SettingsRow
          label="Notifications"
          onPress={() => Alert.alert("Coming soon")}
        />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text variant="label">Legal</Text>
        <SettingsRow
          label="Privacy Policy"
          onPress={() => openLink("https://example.com/privacy")}
        />
        <SettingsRow
          label="Terms of Service"
          onPress={() => openLink("https://example.com/terms")}
        />
      </Card>

      <View style={{ marginTop: spacing.lg }}>
        <Button onPress={handleSignOut} title="Sign out" variant="danger" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
