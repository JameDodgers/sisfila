import { Button, Card, Text, useTheme } from "react-native-paper";

import { format, parseISO } from "date-fns";
import { Service } from "../models/Service";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

const formatServiceDate = (date: string) =>
  format(parseISO(date), "EEE, d 'de' MMM 'de' yyyy, HH:mm");

type ConditionalProps =
  | {
      guest: true;
      enterOnQueue: () => void;
    }
  | {
      guest?: false;
      enterOnQueue?: never;
    };

type BaseProps = {
  item: Service;
};

type Props = BaseProps & ConditionalProps;

export const ServiceItem = ({ item, guest = false, enterOnQueue }: Props) => {
  const theme = useTheme();
  const cardMode = guest ? "elevated" : "contained";

  return (
    <Card className="sm:w-[320]" mode={cardMode}>
      <Card.Title title={item.name} />
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
