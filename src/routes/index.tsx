import * as Linking from "expo-linking";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { DrawerStack } from "./drawerStack.routes";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { useAuth } from "../hooks/auth";
import { CombinedDefaultTheme } from "../styles/theme";

const prefix = Linking.createURL("/");

const config = {
  screens: {
    DrawerStack: {
      screens: {
        initialRouteName: "Atendimentos",
        Atendimento: "entrar/:queueId",
      },
    },
  },
};

const linking = {
  prefixes: [prefix],
  config,
};

export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer linking={linking} theme={CombinedDefaultTheme}>
      <Navigator initialRouteName="DrawerStack">
        <Screen
          name="DrawerStack"
          options={{ headerShown: false }}
          component={DrawerStack}
        />

        {!user.token && (
          <>
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
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
