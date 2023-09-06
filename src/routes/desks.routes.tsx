import { Desk } from "../screens/Member/Desk";
import { Desks } from "../screens/Member/Desks";
import { getStackAndScreensInsideDrawer } from "./helpers";

export const DesksRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Desks",
  screensProps: [
    {
      name: "Desks",
      component: Desks,
      options: {
        title: "Guichês",
      },
    },
    {
      name: "Desk",
      component: Desk,
    },
  ],
});
