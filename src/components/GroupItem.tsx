import { Group } from "../models/Group";
import { Card } from "react-native-paper";

type Props = {
  item: Group;
  onPress: () => void;
};

export const GroupItem = ({ item, onPress }: Props) => {
  return (
    <Card className="sm:w-[320]" mode="elevated" onPress={onPress}>
      <Card.Title title={item.name} />
    </Card>
  );
};
