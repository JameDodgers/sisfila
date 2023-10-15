import { Avatar, List } from "react-native-paper";
import { Client } from "../models/Client";

type Props = {
  item: Client;
  index: number;
};

export const ClientItem = ({ item, index }: Props) => {
  return (
    <List.Item
      title={item.name}
      left={() => <Avatar.Text size={48} label={`${index.toString()}º`} />}
    />
  );
};
