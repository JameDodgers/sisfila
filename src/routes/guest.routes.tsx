import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUp } from "../screens/SignUp";
import { SignIn } from "../screens/SignIn";
import { GuestStackParamList } from "../../@types/navigation";
import { Queue } from "../screens/Guest/Queue";
import { Organization } from "../screens/Guest/Organization";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import { Home } from "../screens/Guest/Home";

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
      <Screen name="Queue" component={Queue} options={{ headerShown: false }} />
    </Navigator>
  );
};
