import { Button, Card, IconButton, Menu } from "react-native-paper";
import { Desk } from "../models/Desk";
import { useState } from "react";

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
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const onPressMenuItem = (callback: () => void) => () => {
    callback();
    closeMenu();
  };

  const vacant = !item.attendantId;

  const actionButtonText = vacant
    ? "Ocupar"
    : occupiedByUser
    ? "Retomar"
    : "Ocupado";

  return (
    <Card>
      <Card.Title
        title={item.name}
        right={(props) => (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton {...props} icon="dots-vertical" onPress={openMenu} />
            }
          >
            <Menu.Item
              leadingIcon="cog"
              title="Configurações"
              onPress={onPressMenuItem(openDeskSettings)}
            />
            <Menu.Item
              leadingIcon="delete"
              title="Excluir"
              onPress={onPressMenuItem(deleteDesk)}
            />
          </Menu>
        )}
      />
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
