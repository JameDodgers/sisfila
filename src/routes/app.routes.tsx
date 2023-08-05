import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DrawerRoutes } from "./drawer.routes";

import { Organizations } from "../screens/Member/Organizations";
import { CreateOrganization } from "../screens/Member/CreateOrganization";

import { Atendimento } from "../screens/Guest/Atendimento";
import { useOrganizerStore } from "../store/organizer";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  const { currentOrganizationId } = useOrganizerStore();

  return (
    <Navigator
      initialRouteName={currentOrganizationId ? "Drawer" : "Organizations"}
    >
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
      <Screen name="Atendimento" component={Atendimento} />
    </Navigator>
  );
};
