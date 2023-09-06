import { Queue } from "../models/Queue";
import { Card, IconButton } from "react-native-paper";

type Props = {
  item: Queue;
  openSettings: () => void;
};

export const QueueItem = ({ item, openSettings }: Props) => {
  return (
    <Card>
      <Card.Title
        title={item.name}
        subtitle={item.description}
        subtitleNumberOfLines={2}
        right={(props) => (
          <IconButton {...props} icon="cog" onPress={openSettings} />
        )}
      />
    </Card>
  );
};
