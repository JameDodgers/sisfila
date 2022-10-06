import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawerContent from "../components/CustomDrawerContent";
import { OrganizationRoutes } from "./organization.routes";
import { HomeRoutes } from "./home.routes";
import { useAppContext } from "../context/app";
import { Platform } from "react-native";
import { AttendantsRoutes } from "./attendants.routes";
import { GroupsRoutes } from "./groups.routes";

const { Navigator, Screen } = createDrawerNavigator();

export const Routes = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <NavigationContainer>
      <Navigator
        defaultStatus={Platform.OS === "web" ? "open" : "closed"}
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
          drawerType: Platform.OS === "android" ? "front" : "slide",
          ...(Platform.OS === "web" && {
            overlayColor: "transparent",
          }),
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {isLoggedIn ? (
          <>
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
            <Screen name="AttendantsRoutes"
              options={{
                title: 'Atendentes'
              }}
              component={AttendantsRoutes}
            />
          </>
        ) : (
          <Screen
            name="HomeRoutes"
            options={{
              title: 'Início'
            }}
            component={HomeRoutes}
          />
        )}
      </Navigator>
    </NavigationContainer>
  );
};
