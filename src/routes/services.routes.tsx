import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CustomNavigationBar } from "../components/CustomNavigationBar";
import { CreateOrUpdateQueue } from "../screens/Member/CreateOrUpdateQueue";
import { CreateOrUpdateService } from "../screens/Member/CreateOrUpdateService";
import { Services } from "../screens/Member/Services";


const { Navigator, Screen } = createNativeStackNavigator();

export const ServicesRoutes = () => {
  return (
    <Navigator
      initialRouteName="Services"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Screen
        name="Services"
        component={Services}
        options={{
          title: "Serviços",
        }}
      />
      <Screen
        name="CreateOrUpdateService"
        component={CreateOrUpdateService}
        options={{
          title: "Criar serviço",
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
