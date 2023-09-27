import { Button, Card, Chip } from "react-native-paper";
import { Desk } from "../models/Desk";

import { CardMenu } from "./CardMenu";
import { ScrollView } from "react-native";

type Props = {
  item: Desk;
  occupiedByUser: boolean;
  userOccupiesSomeDesk: boolean;
  openDeskSettings: () => void;
  openDesk: () => void;
  deleteDesk: () => void;
  startService: () => void;
  endService: () => void;
};

export const DeskItem = ({
  item,
  occupiedByUser,
  userOccupiesSomeDesk,
  openDesk,
  openDeskSettings,
  deleteDesk,
  startService,
  endService,
}: Props) => {
  const vacant = !item.attendantId;

  const actionButtonText = vacant
    ? "Ocupar"
    : occupiedByUser
    ? "Retomar"
    : "Ocupado";

  const cardMenuOptions = [
    {
      leadingIcon: "cog",
      title: "Configurações",
      onPress: openDeskSettings,
    },
    {
      leadingIcon: "delete",
      title: "Excluir",
      onPress: deleteDesk,
    },
  ];

  return (
    <Card>
      <Card.Title
        title={item.name}
        right={() => <CardMenu options={cardMenuOptions} />}
      />
      <Card.Content className="py-4">
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 8 }}
          horizontal
        >
          {item.services.map((service) => (
            <Chip className="max-w-[200]" compact>
              {service.name}
            </Chip>
          ))}
        </ScrollView>
      </Card.Content>
      <Card.Actions>
        {occupiedByUser && <Button onPress={endService}>Encerrar</Button>}
        {!(vacant && userOccupiesSomeDesk) && (
          <Button
            onPress={occupiedByUser ? openDesk : startService}
            disabled={!vacant && !occupiedByUser}
          >
            {actionButtonText}
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};
