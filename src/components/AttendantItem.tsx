import { Button, Card } from "react-native-paper";
import { User } from "../models/User";

type Props = {
  item: User;
  onPressRemove: () => void;
};

export const AttendantItem = ({ item, onPressRemove }: Props) => {
  return (
    <Card mode="contained">
      <Card.Title
        title={item.email}
        // right={(props) => (
        //   <Button className="mx-2" {...props} onPress={onPressRemove}>
        //     Remover
        //   </Button>
        // )}
      />
    </Card>
  );
};
