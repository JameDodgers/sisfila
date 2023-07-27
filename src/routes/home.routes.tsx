import { Identify } from "../screens/Guest/Identify";
import { getStackAndScreensInsideDrawer } from "./helpers";

export const HomeRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Home",
  screensProps: [
    {
      name: "ModalIdentify",
      options: {
        presentation: "modal",
      },
      component: Identify,
    },
  ],
});
