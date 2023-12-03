import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppStackParamList } from "../../@types/navigation";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import { CreateOrganization } from "../screens/Member/CreateOrganization";
import { Organizations } from "../screens/Member/Organizations";
import { useOrganizerStore } from "../store/organizer";

import { DrawerRoutes } from "./drawer.routes";

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export const AppRoutes = () => {
  const { currentOrganizationId } = useOrganizerStore();

  return (
    <Navigator
      initialRouteName={currentOrganizationId ? "Drawer" : "Organizations"}
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Screen
        name="Drawer"
        options={{ headerShown: false }}
        initialParams={{ organizationId: currentOrganizationId }}
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
