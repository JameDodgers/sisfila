import * as Linking from "expo-linking";

import {
  LinkingOptions,
  NavigationContainer,
  getStateFromPath,
} from "@react-navigation/native";

import { CombinedDefaultTheme } from "../styles/theme";
import { useToken } from "../store/auth";

import { AppRoutes } from "./app.routes";
import { GuestRoutes } from "./guest.routes";
import { RootNavigatorParamList } from "../../@types/navigation";

const prefix = Linking.createURL("/");

const config = {
  screens: {
    SignIn: "signin",
    SignUp: "signup",
    Organization: "organization/:id",
    Queue: "queue/:queueId/:serviceId/:registrationId/:queueName",
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
            CreateOrUpdateGroup: "group/edit/:groupId?",
            Group: "group/:groupId/details",
            ImportClients: "group/:groupId/import",
          },
        },
        ServicesRoutes: {
          screens: {
            Services: "services",
            CreateOrUpdateService: "service/:serviceId?",
            CreateOrUpdateQueue: "service/:serviceId?/queue/:queueId?",
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
