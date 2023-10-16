import { Avatar, List, ListItemProps } from "react-native-paper";
import { Client } from "../models/Client";

type Props = {
  item: Client;
  index: number;
} & Omit<ListItemProps, "title">;

export const ClientItem = ({ item, index }: Props) => {
  return (
    <List.Item
      title={item.name}
      left={() => (
        <Avatar.Text
          className="ml-4"
          size={48}
          label={`${index.toString()}º`}
        />
      )}
    />
  );
};
