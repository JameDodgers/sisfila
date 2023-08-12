import { StatusBar } from "expo-status-bar";
import {
  AppState,
  AppStateStatus,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base";

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

import "./global.css";

SplashScreen.preventAutoHideAsync();

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
        <NativeBaseProvider>
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
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({});
