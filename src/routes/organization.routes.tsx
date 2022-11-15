import { OrganizationDetails } from "../screens/Member/OrganizationDetails";

import { getStackAndScreensInsideDrawer } from "./helpers";

export const OrganizationRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Organization",
  screensProps: [{ name: "Organização", component: OrganizationDetails }],
});
