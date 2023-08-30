import { Groups } from "../screens/Member/Groups";
import { CreateGroup } from "../screens/Member/CreateGroup";

import { getStackAndScreensInsideDrawer } from "./helpers";
import { ImportClients } from "../screens/Member/ImportClients";
import { Group } from "../screens/Member/Group";

export const GroupsRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Groups",
  screensProps: [
    { name: "Groups", options: { title: "Grupos" }, component: Groups },
    { name: "Group", options: { title: "Grupo" }, component: Group },
    {
      name: "CreateGroup",
      options: { title: "Criar Grupo" },
      component: CreateGroup,
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
