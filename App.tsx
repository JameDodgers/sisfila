import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Routes } from "./src/routes";
import { AppProvider } from "./src/context/app";

export default function App() {
  return (
    <NativeBaseProvider>
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
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});
