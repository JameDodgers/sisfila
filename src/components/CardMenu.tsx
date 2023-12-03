import { useState } from "react";

import { IconButton, Menu, MenuItemProps } from "react-native-paper";

type MenuItem = {
  onPress?: () => void;
} & Omit<MenuItemProps, "onPress">;

type Props = {
  options: MenuItem[];
};

export const CardMenu = ({ options }: Props) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onPressMenuItem = (callback?: () => void) => () => {
    callback?.();
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton
          accessibilityLabel="Menu de opções"
          icon="dots-vertical"
          onPress={openMenu}
        />
      }
    >
      {options.map(({ onPress, ...option }, index) => (
        <Menu.Item key={index} {...option} onPress={onPressMenuItem(onPress)} />
      ))}
    </Menu>
  );
};
