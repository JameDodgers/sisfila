import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NativeBaseProvider } from "native-base";
import { Routes } from "./src/routes";
import { AppProvider } from "./src/context/app";

const theme = {
  ...DefaultTheme,
};

export default function App() {
  return (
    <NativeBaseProvider>
      <PaperProvider theme={theme}>
        <AppProvider>
          <StatusBar style="auto" translucent={false} />
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <Routes />
          </SafeAreaView>
        </AppProvider>
      </PaperProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});
