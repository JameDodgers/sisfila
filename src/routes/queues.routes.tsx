import { Queues } from "../screens/Member/Queues";

import { CreateOrUpdateQueue } from "../screens/Member/CreateOrUpdateQueue";

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
        name="CreateOrUpdateQueue"
        component={CreateOrUpdateQueue}
        options={{
          title: "Criar fila",
        }}
      />
    </Navigator>
  );
};
