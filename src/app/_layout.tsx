import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { Providers } from "@/components/providers";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "GIP-Black": require("@/assets/fonts/GIP-Black.otf"),
    "GIP-Bold": require("@/assets/fonts/GIP-Bold.otf"),
    "GIP-ExtraBold": require("@/assets/fonts/GIP-ExtraBold.otf"),
    "GIP-Heavy": require("@/assets/fonts/GIP-Heavy.otf"),
    "GIP-Light": require("@/assets/fonts/GIP-Light.otf"),
    "GIP-Medium": require("@/assets/fonts/GIP-Medium.otf"),
    "GIP-Regular": require("@/assets/fonts/GIP-Regular.otf"),
    "GIP-SemiBold": require("@/assets/fonts/GIP-SemiBold.otf"),
    "GIP-Thin": require("@/assets/fonts/GIP-Thin.otf"),
    "GIP-UltraLight": require("@/assets/fonts/GIP-UltraLight.otf"),
  });

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  );
}
