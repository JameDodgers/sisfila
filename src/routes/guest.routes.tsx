import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GuestStackParamList } from "../../@types/navigation";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import { Home } from "../screens/Guest/Home";
import { Organization } from "../screens/Guest/Organization";
import { Queue } from "../screens/Guest/Queue";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

const { Navigator, Screen } = createNativeStackNavigator<GuestStackParamList>();

export const GuestRoutes = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={Home}
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
      <Screen
        name="Organization"
        options={{
          title: "",
        }}
        component={Organization}
      />
      <Screen name="Queue" component={Queue} options={{ title: "" }} />
    </Navigator>
  );
};
