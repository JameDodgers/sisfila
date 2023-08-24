import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DrawerRoutes } from "./drawer.routes";

import { Organizations } from "../screens/Member/Organizations";
import { CreateOrganization } from "../screens/Member/CreateOrganization";

import { useOrganizerStore } from "../store/organizer";
import { AppStackParamList } from "../../@types/navigation";

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

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
    </Navigator>
  );
};
