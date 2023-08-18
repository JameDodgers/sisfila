import * as Clipboard from "expo-clipboard";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { Queue } from "../models/Queue";
import { Pressable, PressableProps, Text } from "react-native";
import { View } from "react-native";
import { Portal, Snackbar } from "react-native-paper";
import { useState } from "react";

type Props = PressableProps & {
  item: Queue;
};

export const QueueItem = ({ item, ...rest }: Props) => {
  const [visible, setVisible] = useState(false);

  const onShowSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  const link = `entrar/${item.id}`;

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(link);
    onShowSnackBar();
  };

  return (
    <Pressable className="bg-stone-50 shadow-sm g-2 p-2 rounded-md" {...rest}>
      <Text>{item.name}</Text>
      <Pressable onPress={handleCopyLink}>
        <View className="bg-zinc-200 flex-row active:bg-zinc-300 p-2 g-2 rounded-sm items-center">
          <Icon name="content-copy" />
          <Text>{link}</Text>
        </View>
      </Pressable>
      <Portal>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          O link para a fila foi copiado para a área de transferência
        </Snackbar>
      </Portal>
    </Pressable>
  );
};
