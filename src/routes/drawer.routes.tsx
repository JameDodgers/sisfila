// import { CommonActions, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawerContent from "../components/CustomDrawerContent";

import { Platform } from "react-native";
import { GroupsRoutes } from "./groups.routes";
import { QueuesRoutes } from "./queues.routes";
import { ServicesRoutes } from "./services.routes";
import { ClientsRoutes } from "./clients.routes";
import { OrganizationRoutes } from "./organization.routes";
import { DesksRoutes } from "./desks.routes";
import { AttendantsRoutes } from "./attendants.routes";

const { Navigator, Screen } = createDrawerNavigator();

export const DrawerRoutes = () => {
  return (
    <Navigator
      initialRouteName="OrganizationDetails"
      defaultStatus={Platform.select({
        web: "open",
        default: "closed",
      })}
      screenOptions={{
        headerShown: false,
        drawerType: Platform.select({
          web: "permanent",
          ios: "slide",
          android: "front",
        }),
        ...(Platform.OS === "web" && {
          overlayColor: "transparent",
        }),
      }}
      // screenListeners={({ navigation, route }) => ({
      //   drawerItemPress: (e) => {
      //     navigation.dispatch((state) => {
      //       const index = state.routes.findIndex(
      //         (r) => r.name === route.name
      //       );

      //       return CommonActions.reset({ ...state, index });
      //     });
      //     e.preventDefault();
      //   },
      // })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Screen
        name="OrganizationRoutes"
        options={{
          title: "Organização",
        }}
        component={OrganizationRoutes}
      />
      <Screen
        name="ClientsRoutes"
        options={{
          title: "Clientes",
        }}
        component={ClientsRoutes}
      />
      <Screen
        name="AttendantsRoutes"
        options={{
          title: "Atendentes",
        }}
        component={AttendantsRoutes}
      />
      <Screen
        name="DesksRoutes"
        options={{
          title: "Guichês",
        }}
        component={DesksRoutes}
      />
      <Screen
        name="GroupsRoutes"
        options={{
          title: "Grupos",
        }}
        component={GroupsRoutes}
      />
      <Screen
        name="ServicesRoutes"
        options={{
          title: "Serviços",
        }}
        component={ServicesRoutes}
      />
      <Screen
        name="QueuesRoutes"
        options={{
          title: "Filas",
        }}
        component={QueuesRoutes}
      />
    </Navigator>
  );
};
