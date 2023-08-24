import * as Linking from "expo-linking";

import { NavigationContainer } from "@react-navigation/native";

import { CombinedDefaultTheme } from "../styles/theme";
import { useToken } from "../store/auth";

import { AppRoutes } from "./app.routes";
import { GuestRoutes } from "./guest.routes";

const prefix = Linking.createURL("/");

const config = {
  screens: {
    initialRouteName: "Queue",
    Queue: "queue/:queueId",
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
      {token ? <AppRoutes /> : <GuestRoutes />}
    </NavigationContainer>
  );
};
