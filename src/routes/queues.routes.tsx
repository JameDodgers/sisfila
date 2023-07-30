import { Queues } from "../screens/Member/Queues";
import { Queue } from "../screens/Member/Queue";

import { getStackAndScreensInsideDrawer } from "./helpers";
import { CreateQueue } from "../screens/Member/CreateQueue";

export const QueuesRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Queues",
  screensProps: [
    { name: "Queues", options: { title: "Filas" }, component: Queues },
    {
      name: "Queue",
      options: { title: "Fila" },
      component: Queue,
    },
    {
      name: "CreateQueue",
      options: { title: "Criar Fila" },
      component: CreateQueue,
    },
  ],
});
