import { Queues } from "../screens/Member/Queues";

import { CreateQueue } from "../screens/Member/CreateQueue";
import { QueueSettings } from "../screens/Member/QueueSettings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomNavigationBar } from "../components/CustomNavigationBar";

const { Navigator, Screen } = createNativeStackNavigator();

export const QueuesRoutes = () => {
  return (
    <Navigator
      initialRouteName="Queues"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Screen
        name="Queues"
        component={Queues}
        options={{
          title: "Filas",
        }}
      />
      <Screen
        name="CreateQueue"
        component={CreateQueue}
        options={{
          title: "Criar fila",
        }}
      />
      <Screen name="QueueSettings" component={QueueSettings} />
    </Navigator>
  );
};
