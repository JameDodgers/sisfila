import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus, Platform, View } from "react-native";

import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { focusManager } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";
import { pt, registerTranslation } from "react-native-paper-dates";

import { Loading } from "./src/components/Loading";
import { DataProvider } from "./src/contexts/data";
import { LoadingProvider } from "./src/contexts/loading";
import { useRequestPermissions } from "./src/hooks/useRequestPermissions";
import { Routes } from "./src/routes";
import { useMessageStore } from "./src/store/message";
import { CombinedDefaultTheme } from "./src/styles/theme";

registerTranslation("pt", pt);

setDefaultOptions({ locale: ptBR });

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
  useRequestPermissions();

  const messageStore = useMessageStore();

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
            <LoadingProvider>
              <StatusBar style="auto" translucent={false} />
              <Routes />
              <Snackbar
                visible={messageStore.visible}
                onDismiss={messageStore.dismiss}
              >
                {messageStore.message}
              </Snackbar>
              <Loading />
            </LoadingProvider>
          </DataProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </View>
  );
}
