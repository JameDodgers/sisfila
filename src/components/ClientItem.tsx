import { Avatar, List, useTheme } from "react-native-paper";
import { Client } from "../models/Client";

type Props = {
  item: Client;
  index: number;
};

export const ClientItem = ({ item, index }: Props) => {
  const theme = useTheme();

  return (
    <List.Item
      style={{
        backgroundColor: theme.colors.primaryContainer,
      }}
      className="px-4"
      title={item.name}
      left={() => <Avatar.Text size={48} label={item.name[0]} />}
    />
  );
};
