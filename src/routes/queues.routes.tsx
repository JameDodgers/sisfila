import { Queues } from "../screens/Member/Queues";

import { getStackAndScreensInsideDrawer } from "./helpers";
import { CreateQueue } from "../screens/Member/CreateQueue";
import { QueueSettings } from "../screens/Member/QueueSettings";

export const QueuesRoutes = getStackAndScreensInsideDrawer({
  initialRouteName: "Queues",
  screensProps: [
    { name: "Queues", options: { title: "Filas" }, component: Queues },
    {
      name: "QueueSettings",
      options: { title: "Configurações" },
      component: QueueSettings,
    },
    {
      name: "CreateQueue",
      options: { title: "Criar Fila" },
      component: CreateQueue,
    },
  ],
});
