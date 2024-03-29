import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootNavigatorParamList } from "../../@types/navigation";
import { useToken } from "../store/auth";
import { CombinedDefaultTheme } from "../styles/theme";

import { AppRoutes } from "./app.routes";
import { GuestRoutes } from "./guest.routes";

const prefix = Linking.createURL("/");

const config = {
  screens: {
    SignIn: "signin",
    SignUp: "signup",
    Organization: "organization/:id",
    Queue: "queue",
    Organizations: "organizations",
    CreateOrganization: "organization/create",
    Drawer: {
      path: "organization/:organizationId",
      screens: {
        OrganizationDetails: "details",
        Attendants: "attendants",
        Clients: "clients",
        GroupsRoutes: {
          screens: {
            Groups: "groups",
            CreateOrUpdateGroup: "group/:groupId?",
            Group: "group/:groupId/details",
            ImportClients: "group/:groupId/import",
          },
        },
        ServicesRoutes: {
          screens: {
            Services: "services",
            CreateOrUpdateService: "service/:serviceId?",
            CreateOrUpdateQueue: "queue",
          },
        },
        DesksRoutes: {
          screens: {
            Desks: "desks",
            Desk: "desk/:deskId/details",
            CreateOrUpdateDesk: "desk/:deskId?",
          },
        },
      },
    },
  },
};

const linking: LinkingOptions<RootNavigatorParamList> = {
  prefixes: [prefix],
  config,
};

export const Routes = () => {
  const token = useToken();

  return (
    <NavigationContainer linking={linking} theme={CombinedDefaultTheme}>
      {token ? <AppRoutes /> : <GuestRoutes />}
    </NavigationContainer>
  );
};
