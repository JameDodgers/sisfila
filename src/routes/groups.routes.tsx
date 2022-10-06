import { Groups } from "../screens/Member/Groups";

import { getStackAndScreensInsideDrawer } from "./helpers";

export const GroupsRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Groups",
  screensProps: [{ name: "Groups", component: Groups }],
});
