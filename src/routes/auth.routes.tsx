import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUp } from "../screens/SignUp";
import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="SignIn">
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
  );
};
