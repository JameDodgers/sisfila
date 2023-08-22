import * as Clipboard from "expo-clipboard";

import * as Linking from "expo-linking";

import { Queue } from "../models/Queue";
import { Text } from "react-native";
import { View } from "react-native";
import { Button, Card, IconButton, Portal, Snackbar } from "react-native-paper";
import { useState } from "react";

type Props = {
  item: Queue;
  openSettings: () => void;
  openQueue: () => void;
};

export const QueueItem = ({ item, openSettings, openQueue }: Props) => {
  const [visible, setVisible] = useState(false);

  const onShowSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  const link = `entrar/${item.id}`;

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(link);
    onShowSnackBar();
  };

  return (
    <>
      <Card>
        <Card.Title
          title={item.name}
          right={(props) => (
            <IconButton {...props} icon="cog" onPress={openSettings} />
          )}
        />
        <Card.Content>
          <View className="bg-zinc-200 pr-2 flex-row active:bg-zinc-300 rounded-sm items-center">
            <IconButton
              icon="content-copy"
              size={20}
              onPress={handleCopyLink}
            />
            <Text className="flex-1">{link}</Text>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button onPress={openQueue}>Atender</Button>
        </Card.Actions>
      </Card>
      <Portal>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          O link para a fila foi copiado para a área de transferência
        </Snackbar>
      </Portal>
    </>
  );
};
