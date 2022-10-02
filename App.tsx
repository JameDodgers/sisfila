import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack, Box } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <VStack>
        <StatusBar style="auto" />
        <Box>Hello world</Box>
      </VStack>
    </NativeBaseProvider>
  );
}