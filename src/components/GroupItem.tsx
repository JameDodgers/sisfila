import { Group } from "../models/Group";
import { Card } from "react-native-paper";
import { CardMenu } from "./CardMenu";

type Props = {
  item: Group;
  openGroup: () => void;
  deleteGroup: () => void;
  openGroupSettings: () => void;
};

export const GroupItem = ({
  item,
  openGroup,
  deleteGroup,
  openGroupSettings,
}: Props) => {
  const cardMenuOptions = [
    {
      leadingIcon: "cog",
      title: "Configurações",
      onPress: openGroupSettings,
    },
    {
      leadingIcon: "delete",
      title: "Excluir",
      onPress: deleteGroup,
    },
  ];

  return (
    <Card onPress={openGroup}>
      <Card.Title
        title={item.name}
        right={() => <CardMenu options={cardMenuOptions} />}
      />
    </Card>
  );
};
