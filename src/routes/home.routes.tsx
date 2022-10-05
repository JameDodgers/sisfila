import { Atendimentos } from "../screens/Atendimentos";
import { Organization } from "../screens/Guest/Organization";

import { getStackAndScreensInsideDrawer } from "./helpers";

export const HomeRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Home",
  screensProps: [
    { name: "Home", component: Atendimentos },
    { name: "Organization", component: Organization },
  ],
});
