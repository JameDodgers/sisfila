import {
  Text,
  VStack,
  Icon,
  IPressableProps,
  Pressable,
  HStack,
  Toast,
} from "native-base";

import * as Clipboard from "expo-clipboard";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Queue } from "../models/Queue";

type Props = IPressableProps & {
  item: Queue;
};

export const QueueItem = ({ item, ...rest }: Props) => {
  const link = `entrar/${item.id}`;

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(link);
    Toast.show({
      duration: 3000,
      description:
        "O link para a fila foi copiado para a área de transferência",
    });
  };

  return (
    <Pressable {...rest}>
      <VStack bg="light.50" space={2} p={2} mb={4} shadow={5} rounded="md">
        <Text>{item.name}</Text>
        <Pressable onPress={handleCopyLink}>
          {({ isHovered, isPressed }) => (
            <HStack
              bg={isHovered || isPressed ? "gray.300" : "gray.200"}
              p={2}
              rounded="sm"
              space={2}
              alignItems="center"
            >
              <Icon as={MaterialCommunityIcons} name="content-copy" />
              <Text>{link}</Text>
            </HStack>
          )}
        </Pressable>
      </VStack>
    </Pressable>
  );
};
