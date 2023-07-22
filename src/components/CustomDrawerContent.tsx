import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";

import { useToken } from "../store/tokens";
import { useUserQueries } from "../queries/user";

type Props = DrawerContentComponentProps & {};

const CustomDrawerContent = ({ ...props }: Props) => {
  const token = useToken();

  const { signOut } = useUserQueries();

  return (
    <DrawerContentScrollView {...props}>
      {!!token && (
        <DrawerItem
          label="Minhas organizações"
          onPress={() => {
            props.navigation.navigate("Organizations");
          }}
        />
      )}
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
