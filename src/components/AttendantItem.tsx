import { Button, Card } from "react-native-paper";
import { Attendant } from "../models/Attendant";

type Props = {
  item: Attendant;
  onPressRemove: () => void;
};

export const AttendantItem = ({ item, onPressRemove }: Props) => {
  return (
    <Card>
      <Card.Title
        title={item.name}
        right={(props) => (
          <Button className="mx-2" {...props} onPress={onPressRemove}>
            Remover
          </Button>
        )}
      />
    </Card>
  );
};
