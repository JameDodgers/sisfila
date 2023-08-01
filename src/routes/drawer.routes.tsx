import { useMemo } from "react";
// import { CommonActions, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawerContent from "../components/CustomDrawerContent";

import { Platform } from "react-native";
import { GroupsRoutes } from "./groups.routes";
import { QueuesRoutes } from "./queues.routes";
import { ServicesRoutes } from "./services.routes";
import { ClientsRoutes } from "./clients.routes";
import { OrganizationDetails } from "../screens/Member/OrganizationDetails";

const { Navigator, Screen } = createDrawerNavigator();

export const DrawerRoutes = () => {
  const drawerType = useMemo(() => {
    switch (Platform.OS) {
      case "web":
        return "permanent";
      case "ios":
        return "slide";
      case "android":
        return "front";
    }
  }, []);

  return (
    <Navigator
      defaultStatus={Platform.OS === "web" ? "open" : "closed"}
      initialRouteName="OrganizationDetails"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerType,
        // drawerType: Platform.OS === "android" ? "front" : "slide",
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
        name="OrganizationDetails"
        options={{
          title: "Organização",
        }}
        component={OrganizationDetails}
      />
      <Screen
        name="ClientsRoutes"
        options={{
          title: "Clientes",
        }}
        component={ClientsRoutes}
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
        name="Queues"
        options={{
          title: "Filas",
        }}
        component={QueuesRoutes}
      />
    </Navigator>
  );
};
