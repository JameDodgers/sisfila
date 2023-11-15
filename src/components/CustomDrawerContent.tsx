import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";

import { useUserQueries } from "../queries/user";
import { useToken } from "../store/auth";

import { OrganizationSelector } from "./OrganizationSelector";

type Props = DrawerContentComponentProps & {};

const CustomDrawerContent = ({ ...props }: Props) => {
  const token = useToken();

  const { signOut } = useUserQueries();

  return (
    <DrawerContentScrollView {...props}>
      <OrganizationSelector />
      <DrawerItemList {...props} />
      {!!token ? (
        <DrawerItem label="Sair" onPress={signOut} />
      ) : (
        <DrawerItem
          label="Entrar"
          onPress={() => {
            props.navigation.navigate("SignIn");
          }}
        />
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
