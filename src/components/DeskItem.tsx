import { Button, Card } from "react-native-paper";
import { Desk } from "../models/Desk";

type Props = {
  item: Desk;
};

export const DeskItem = ({ item }: Props) => {
  return (
    <Card>
      <Card.Title title={item.name} />
      <Card.Actions>
        <Button mode="contained">Iniciar</Button>
      </Card.Actions>
    </Card>
  );
};
