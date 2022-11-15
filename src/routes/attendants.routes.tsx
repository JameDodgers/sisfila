import { Attendants } from "../screens/Member/Attendants";

import { getStackAndScreensInsideDrawer } from "./helpers";

export const AttendantsRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Attendants",
  screensProps: [
    {
      name: "Attendants",
      options: {
        title: "Atendentes",
      },
      component: Attendants,
    },
  ],
});
