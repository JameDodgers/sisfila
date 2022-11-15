import { useNavigation } from "@react-navigation/native";
import { Input, VStack } from "native-base";

export const Identify = () => {
  const navigation = useNavigation();

  return (
    <VStack>
      <Input />
    </VStack>
  );
};
