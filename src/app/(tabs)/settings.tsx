import Constants from "expo-constants";
import { useState } from "react";
import { Alert, Linking, Pressable, StyleSheet, View } from "react-native";

import { Button, Card, Screen, Switch, Text } from "@/components/ui";
import { useDialog } from "@/hooks/use-dialog";
import { useToast } from "@/hooks/use-toast";
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
  const { colors, spacing } = useTheme();
  const toast = useToast();
  const { confirm } = useDialog();
  const [notifications, setNotifications] = useState(true);
  const appVersion = Constants.expoConfig?.version ?? "1.0.0";

  async function handleSignOut() {
    const confirmed = await confirm({
      title: "Sign out?",
      message: "You will need to sign in again to access your account.",
      confirmLabel: "Sign out",
      variant: "danger",
    });

    if (confirmed) {
      toast.show("Signed out");
    }
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

      <Card style={{ marginTop: spacing.md }}>
        <Text variant="label">Account</Text>
        <SettingsRow
          label="Profile"
          onPress={() => Alert.alert("Coming soon")}
        />
        <View style={[styles.switchRow, { borderBottomColor: colors.border }]}>
          <View style={{ flex: 1 }}>
            <Text variant="body">Notifications</Text>
            <Text style={{ marginTop: spacing.xs }} variant="muted">
              Receive push notifications
            </Text>
          </View>
          <Switch onValueChange={setNotifications} value={notifications} />
        </View>
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
  switchRow: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    paddingVertical: 12,
    width: "100%",
  },
});
