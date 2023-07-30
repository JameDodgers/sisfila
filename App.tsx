import { StatusBar } from "expo-status-bar";
import {
  AppState,
  AppStateStatus,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base";

import { Routes } from "./src/routes";
import { focusManager } from "@tanstack/react-query";

import { CombinedDefaultTheme } from "./src/styles/theme";
import { useEffect } from "react";
import { DataProvider } from "./src/contexts/data";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
};

export default function App() {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
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
  );
}

const styles = StyleSheet.create({});
