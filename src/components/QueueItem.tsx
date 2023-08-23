import * as Clipboard from "expo-clipboard";

import * as Linking from "expo-linking";

import { Queue } from "../models/Queue";
import { View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Portal,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import { useState } from "react";

type Props = {
  item: Queue;
  openSettings: () => void;
  openQueue: () => void;
};

export const QueueItem = ({ item, openSettings, openQueue }: Props) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const onShowSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(link);
    onShowSnackBar();
  };

  const link = Linking.createURL(`queue/${item.id}`);

  return (
    <>
      <Card>
        <Card.Title
          title={item.name}
          subtitle={item.description}
          subtitleNumberOfLines={2}
          right={(props) => (
            <IconButton {...props} icon="cog" onPress={openSettings} />
          )}
        />
        <Card.Content>
          <View
            style={{ backgroundColor: theme.colors.surfaceVariant }}
            className="mt-2 p-2 flex-row rounded-sm items-center"
          >
            <Text
              style={{ color: theme.colors.onSurfaceVariant }}
              numberOfLines={1}
              className="flex-1"
            >
              {link}
            </Text>
          </View>
        </Card.Content>
        <Card.Actions className="justify-between">
          <IconButton icon="content-copy" size={20} onPress={handleCopyLink} />
          <Button mode="contained" onPress={openQueue}>
            Atender
          </Button>
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
