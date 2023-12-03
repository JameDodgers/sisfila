import { ReactNode } from "react";
import { Platform } from "react-native";

import { DrawerHeaderProps } from "@react-navigation/drawer";
import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";

type HeaderProps = NativeStackHeaderProps | DrawerHeaderProps;

type Props = {
  headerRight?: ReactNode;
  title?: string;
} & HeaderProps;

export const CustomNavigationBar = ({
  navigation,
  route,
  options,
  headerRight,
  ...props
}: Props) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {"back" in props && props.back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : "toggleDrawer" in navigation && Platform.OS !== "web" ? (
        <Appbar.Action
          icon="menu"
          accessibilityLabel="Menu"
          accessibilityHint="Abrir menu"
          onPress={navigation.toggleDrawer}
        />
      ) : null}

      <Appbar.Content title={props.title || title} />
      {headerRight}
    </Appbar.Header>
  );
};
