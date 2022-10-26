import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { DrawerRoutes } from "./drawer.routes";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

export const Routes = () => (
  <NavigationContainer>
    <Navigator initialRouteName="Drawer">
      <Screen
        name="Drawer"
        options={{ headerShown: false }}
        component={DrawerRoutes}
      />
      <Screen
        name="SignIn"
        options={{
          title: "Entrar",
        }}
        component={SignIn}
      />
      <Screen
        name="SignUp"
        options={{
          title: "Cadastro",
        }}
        component={SignUp}
      />
    </Navigator>
  </NavigationContainer>
);
