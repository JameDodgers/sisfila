import { Groups } from "../screens/Member/Groups";
import { CreateGroup } from "../screens/Member/CreateGroup";

import { getStackAndScreensInsideDrawer } from "./helpers";

export const GroupsRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Groups",
  screensProps: [
    { name: "Groups", options: { title: "Grupos" }, component: Groups },
    {
      name: "CreateGroup",
      options: { title: "Criar Grupo" },
      component: CreateGroup,
    },
  ],
});
