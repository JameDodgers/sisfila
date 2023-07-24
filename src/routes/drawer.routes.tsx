import { useMemo } from "react";
// import { CommonActions, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawerContent from "../components/CustomDrawerContent";
import { OrganizationRoutes } from "./organization.routes";
import { HomeRoutes } from "./home.routes";

import { Platform } from "react-native";
import { AttendantsRoutes } from "./attendants.routes";
import { GroupsRoutes } from "./groups.routes";
import { QueuesRoutes } from "./queues.routes";
import { ServicesRoutes } from "./services.routes";
import { ClientsRoutes } from "./clients.routes";
import { useToken } from "../store/auth";

const { Navigator, Screen } = createDrawerNavigator();

export const DrawerRoutes = () => {
  const token = useToken();

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
      initialRouteName="HomeStack"
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
      {!!token ? (
        <>
          <Screen
            name="ClientsRoutes"
            options={{
              title: "Clientes",
            }}
            component={ClientsRoutes}
          />
          <Screen
            name="OrganizationRoutes"
            options={{
              title: "Organização",
            }}
            component={OrganizationRoutes}
          />
          <Screen
            name="GroupsRoutes"
            options={{
              title: "Grupos",
            }}
            component={GroupsRoutes}
          />
          <Screen
            name="AttendantsRoutes"
            options={{
              title: "Atendentes",
            }}
            component={AttendantsRoutes}
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
              headerShown: true,
            }}
            component={QueuesRoutes}
          />
        </>
      ) : (
        <Screen
          name="HomeRoutes"
          options={{
            title: "Início",
          }}
          component={HomeRoutes}
        />
      )}
    </Navigator>
  );
};
