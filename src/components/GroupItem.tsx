import { Group } from "../models/Group";
import { List } from "react-native-paper";

type Props = {
  item: Group;
};

export const GroupItem = ({ item }: Props) => {
  return <List.Item title={item.name} />;
};
