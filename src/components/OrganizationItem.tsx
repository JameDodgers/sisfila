import { Organization } from "../models/Organization";
import { Card } from "react-native-paper";

type Props = {
  item: Organization;
  onPress: () => void;
};

export const OrganizationItem = ({ item, onPress }: Props) => {
  return (
    <Card onPress={onPress}>
      <Card.Title title={item.name} subtitle={item.code} />
    </Card>
  );
};
