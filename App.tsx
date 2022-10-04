import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, VStack, Text } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <VStack flex={1} justifyContent="center" alignItems="center">
        <Text>Hello world</Text>
      </VStack>
    </NativeBaseProvider>
  );
}
