import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";

import { useAppContext } from "../context/app";

type Props = DrawerContentComponentProps & {};

const CustomDrawerContent = ({ ...props }: Props) => {
  const { isLoggedIn } = useAppContext();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {isLoggedIn ? (
        <DrawerItem
          label="Sair"
          onPress={() => {
            console.log("onPress");
          }}
        />
      ) : (
        <DrawerItem
          label="Login"
          onPress={() => {
            console.log("onPress");
          }}
        />
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
