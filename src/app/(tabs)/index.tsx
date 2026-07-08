import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, Card, Input, Screen, Text } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";

export default function HomeScreen() {
  const { spacing } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePress() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <Screen scroll>
      <Text variant="title">Native Template</Text>
      <Text style={{ marginTop: spacing.xs }} variant="muted">
        Direct styles, no Tailwind. Clone this and ship.
      </Text>

      <Card style={{ marginTop: spacing.lg }}>
        <Text variant="label">Sign in</Text>
        <Input
          autoCapitalize="none"
          error={
            email.length > 0 && !email.includes("@")
              ? "Invalid email"
              : undefined
          }
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          style={{ marginTop: spacing.sm }}
          value={email}
        />
        <View
          style={[styles.actions, { marginTop: spacing.md, gap: spacing.sm }]}
        >
          <Button loading={loading} onPress={handlePress} title="Continue" />
          <Button onPress={() => setEmail("")} title="Clear" variant="ghost" />
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    width: "100%",
  },
});
