import { Queues } from "../screens/Member/Queues";
import { Queue } from "../screens/Member/Queue";

import { getStackAndScreensInsideDrawer } from "./helpers";

export const QueuesRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Queues",
  screensProps: [
    { name: "Queues", options: { title: "Filas" }, component: Queues },
    {
      name: "Queue",
      options: { title: "Fila" },
      component: Queue,
    },
  ],
});
