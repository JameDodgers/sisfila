import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateService } from "../screens/Member/CreateService";
import { Services } from "../screens/Member/Services";

import { CustomNavigationBar } from "../components/CustomNavigationBar";

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
        name="CreateService"
        component={CreateService}
        options={{
          title: "Criar serviço",
        }}
      />
    </Navigator>
  );
};
