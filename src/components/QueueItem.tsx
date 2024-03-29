import { IconButton, List, ListItemProps } from "react-native-paper";

import { Queue } from "../models/Queue";

import { CardMenu } from "./CardMenu";

type Props = {
  item: Queue;
  openSettings: () => void;
  remove: () => void;
} & Omit<ListItemProps, "title">;

export const QueueItem = ({ item, openSettings, remove, ...props }: Props) => {
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
    <List.Item
      title={item.name}
      left={(props) => (
        <IconButton
          accessibilityLabel="Arrastar"
          accessibilityHint="Arrastar para mudar posição da fila na lista"
          {...props}
          icon="drag-horizontal-variant"
        />
      )}
      right={() => <CardMenu options={cardMenuOptions} />}
      descriptionNumberOfLines={2}
      description={item.groups.map((group) => group.name).join(", ")}
      {...props}
    />
  );
};
