import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./src/hooks/auth";
import { Routes } from "./src/routes";

const theme = {
  ...DefaultTheme,
};

export default function App() {
  return (
    <NativeBaseProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <StatusBar style="auto" translucent={false} />
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <Routes />
          </SafeAreaView>
        </AuthProvider>
      </PaperProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});
