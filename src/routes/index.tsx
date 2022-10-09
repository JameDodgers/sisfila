import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { DrawerRoutes } from "./drawer.routes";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

export const Routes = () => (
  <NavigationContainer>
    <Navigator initialRouteName="Drawer">
      <Screen
        name="Drawer"
        options={{ headerShown: false }}
        component={DrawerRoutes}
      />
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
    </Navigator>
  </NavigationContainer>
);
