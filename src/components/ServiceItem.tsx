import { Card, Text } from "react-native-paper";

import { format, parseISO } from "date-fns";
import { Service } from "../models/Service";

type Props = {
  item: Service;
};

export const ServiceItem = ({ item }: Props) => {
  return (
    <Card className="web:sm:w-[640]" mode="contained">
      <Card.Title title={item.name} />
      <Card.Content>
        <Text>{format(parseISO(item.opensAt), "dd/MM/yyyy")}</Text>
        <Text>{format(parseISO(item.closesAt), "dd/MM/yyyy")}</Text>
      </Card.Content>
    </Card>
  );
};
