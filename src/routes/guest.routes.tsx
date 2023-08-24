import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUp } from "../screens/SignUp";
import { SignIn } from "../screens/SignIn";
import { GuestStackParamList } from "../../@types/navigation";
import { Queue } from "../screens/Guest/Queue";

const { Navigator, Screen } = createNativeStackNavigator<GuestStackParamList>();

export const GuestRoutes = () => {
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
      <Screen name="Queue" component={Queue} options={{ headerShown: false }} />
    </Navigator>
  );
};
