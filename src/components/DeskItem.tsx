import { Button, Card } from "react-native-paper";
import { Desk } from "../models/Desk";

type Props = {
  item: Desk;
  openDesk: () => void;
};

export const DeskItem = ({ item, openDesk }: Props) => {
  return (
    <Card>
      <Card.Title title={item.name} />
      <Card.Actions>
        <Button onPress={openDesk} mode="contained">
          Iniciar
        </Button>
      </Card.Actions>
    </Card>
  );
};
