import * as Linking from "expo-linking";

import { NavigationContainer } from "@react-navigation/native";

import { CombinedDefaultTheme } from "../styles/theme";
import { useToken } from "../store/auth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

const prefix = Linking.createURL("/");

const config = {
  screens: {
    DrawerStack: {
      screens: {
        initialRouteName: "Atendimentos",
        Atendimento: "queue/:queueId",
      },
    },
  },
};

const linking = {
  prefixes: [prefix],
  config,
};

export const Routes = () => {
  const token = useToken();

  return (
    <NavigationContainer linking={linking} theme={CombinedDefaultTheme}>
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
