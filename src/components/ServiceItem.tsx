import { Button, Card, Text, useTheme } from "react-native-paper";

import { format, parseISO } from "date-fns";
import { Service } from "../models/Service";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { CardMenu } from "./CardMenu";

const formatServiceDate = (date: string) =>
  format(parseISO(date), "EEE, d 'de' MMM 'de' yyyy, HH:mm");

type ConditionalProps =
  | {
      guest: true;
      enterOnQueue: () => void;
      deleteService?: never;
      openServiceSettings?: never;
    }
  | {
      guest?: false;
      enterOnQueue?: never;
      deleteService: () => void;
      openServiceSettings: () => void;
    };

type BaseProps = {
  item: Service;
};

type Props = BaseProps & ConditionalProps;

export const ServiceItem = ({
  item,
  guest = false,
  enterOnQueue,
  deleteService,
  openServiceSettings,
}: Props) => {
  const theme = useTheme();
  const cardMode = guest ? "elevated" : "contained";

  const cardMenuOptions = [
    {
      leadingIcon: "cog",
      title: "Configurações",
      onPress: openServiceSettings,
    },
    {
      leadingIcon: "delete",
      title: "Excluir",
      onPress: deleteService,
    },
  ];

  return (
    <Card mode={cardMode}>
      <Card.Title
        title={item.name}
        right={() => (!guest ? <CardMenu options={cardMenuOptions} /> : null)}
      />
      <Card.Content>
        <View className="flex-row items-center">
          <Icon
            size={20}
            color={theme.colors.onSurfaceVariant}
            name="calendar-start"
          />
          <Text variant="bodyLarge" className="ml-2">
            {formatServiceDate(item.opensAt)}
          </Text>
        </View>
        <View className="flex-row mt-1 items-center">
          <Icon
            size={20}
            color={theme.colors.onSurfaceVariant}
            name="calendar-end"
          />
          <Text variant="bodyLarge" className="ml-2">
            {formatServiceDate(item.closesAt)}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        {guest && (
          <Button
            disabled={!item.isOpened}
            mode="contained"
            onPress={enterOnQueue}
          >
            Entrar na fila
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};
