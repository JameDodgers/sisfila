import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUp } from "../screens/SignUp";
import { SignIn } from "../screens/SignIn";
import { AuthStackParamList } from "../../@types/navigation";

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

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
