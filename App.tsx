import { StatusBar } from "expo-status-bar";
import {
  AppState,
  AppStateStatus,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { Routes } from "./src/routes";
import { focusManager } from "@tanstack/react-query";

import { CombinedDefaultTheme } from "./src/styles/theme";
import { useCallback, useEffect } from "react";
import { DataProvider } from "./src/contexts/data";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import { NativeWindStyleSheet } from "nativewind";

import { pt, registerTranslation } from "react-native-paper-dates";

registerTranslation("pt", pt);

SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
  default: "native",
});

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={CombinedDefaultTheme}>
          <DataProvider>
            <StatusBar style="auto" translucent={false} />
            <SafeAreaView
              style={{
                flex: 1,
              }}
            >
              <Routes />
            </SafeAreaView>
          </DataProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </View>
  );
}
