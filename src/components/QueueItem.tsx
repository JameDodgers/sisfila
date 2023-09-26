import { Queue } from "../models/Queue";
import { Card } from "react-native-paper";
import { CardMenu } from "./CardMenu";

type Props = {
  item: Queue;
  openSettings: () => void;
  remove: () => void;
};

export const QueueItem = ({ item, openSettings, remove }: Props) => {
  const cardMenuOptions = [
    {
      leadingIcon: "cog",
      title: "Configurações",
      onPress: openSettings,
    },
    {
      leadingIcon: "delete",
      title: "Excluir",
      onPress: remove,
    },
  ];

  return (
    <Card mode="contained">
      <Card.Title
        title={item.name}
        subtitle={item.description}
        subtitleNumberOfLines={2}
        right={() => <CardMenu options={cardMenuOptions} />}
      />
    </Card>
  );
};
