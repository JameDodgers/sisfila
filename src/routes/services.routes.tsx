import { Services } from "../screens/Member/Services";

import { getStackAndScreensInsideDrawer } from "./helpers";

export const ServicesRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Services",
  screensProps: [
    {
      name: "Services",
      options: {
        title: "Serviços",
      },
      component: Services,
    },
  ],
});
