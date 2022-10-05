import { Organization } from "../screens/Member/Organization";

import { getStackAndScreensInsideDrawer } from "./helpers";

export const OrganizationRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Organization",
  screensProps: [{ name: "Organization", component: Organization }],
});
