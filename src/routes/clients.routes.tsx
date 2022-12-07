import { Clients } from "../screens/Member/Clients";
import { ImportClients } from "../screens/Member/ImportClients";

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
    {
      name: "ImportClients",
      component: ImportClients,
      options: {
        title: "Importar Clientes",
      },
    },
  ],
});
