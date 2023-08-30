import { Clients } from "../screens/Member/Clients";
import { getStackAndScreensInsideDrawer } from "./helpers";

export const ClientsRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Clients",
  screensProps: [
    {
      name: "Clients",
      component: Clients,
      options: {
        title: "Clientes",
      },
    },
  ],
});
