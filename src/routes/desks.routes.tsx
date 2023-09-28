import { Desks } from "../screens/Member/Desks";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import { CreateOrUpdateDesk } from "../screens/Member/CreateOrUpdateDesk";

const { Navigator, Screen } = createNativeStackNavigator();

export const DesksRoutes = () => {
  return (
    <Navigator
      initialRouteName="Desks"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Screen
        name="Desks"
        component={Desks}
        options={{
          title: "Guichês",
        }}
      />
      <Screen
        name="CreateOrUpdateDesk"
        component={CreateOrUpdateDesk}
        options={{
          title: "Criar guichê",
        }}
      />
    </Navigator>
  );
};
