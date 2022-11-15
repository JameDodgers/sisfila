import { Atendimentos } from "../screens/Atendimentos";
import { Organization } from "../screens/Guest/Organization";
import { Identify } from "../screens/Guest/Identify";
import { getStackAndScreensInsideDrawer } from "./helpers";

export const HomeRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Home",
  screensProps: [
    {
      name: "Home",
      options: {
        title: "Atendimentos",
      },
      component: Atendimentos,
    },
    {
      name: "Organization",
      component: Organization,
    },
    {
      name: "ModalIdentify",
      options: {
        presentation: "modal",
      },
      component: Identify,
    },
  ],
});
