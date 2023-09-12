import { Desk } from "../screens/Member/Desk";
import { Desks } from "../screens/Member/Desks";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import { DeskSettings } from "../screens/Member/DeskSettings";

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
      <Screen name="Desk" component={Desk} />
      <Screen name="DeskSettings" component={DeskSettings} />
    </Navigator>
  );
};
