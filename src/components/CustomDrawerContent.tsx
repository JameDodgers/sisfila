import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";
import { useAuth } from "../hooks/auth";

type Props = DrawerContentComponentProps & {};

const CustomDrawerContent = ({ ...props }: Props) => {
  const { user, signOut } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      {user.token && (
        <DrawerItem
          label="Minhas organizações"
          onPress={() => {
            props.navigation.navigate("Organizations");
          }}
        />
      )}
      <DrawerItemList {...props} />
      {user.token ? (
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
