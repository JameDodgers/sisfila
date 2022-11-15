import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DrawerRoutes } from "./drawer.routes";

import { Organizations } from "../screens/Member/Organizations";
import { CreateOrganization } from "../screens/Member/CreateOrganization";
import { DrawerProvider } from "../contexts/drawer";

const { Navigator, Screen } = createNativeStackNavigator();

export const DrawerStack = () => {
  return (
    <DrawerProvider>
      <Navigator initialRouteName="Drawer">
        <Screen
          name="Drawer"
          options={{ headerShown: false }}
          component={DrawerRoutes}
        />
        <Screen
          name="Organizations"
          options={{ title: "Minhas organizações" }}
          component={Organizations}
        />
        <Screen
          name="CreateOrganization"
          options={{ title: "Criar organização" }}
          component={CreateOrganization}
        />
      </Navigator>
    </DrawerProvider>
  );
};
