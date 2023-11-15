import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CustomNavigationBar } from "../components/CustomNavigationBar";
import { CreateOrUpdateGroup } from "../screens/Member/CreateOrUpdateGroup";
import { Group } from "../screens/Member/Group";
import { Groups } from "../screens/Member/Groups";
import { ImportClients } from "../screens/Member/ImportClients";



const { Navigator, Screen } = createNativeStackNavigator();

export const GroupsRoutes = () => {
  return (
    <Navigator
      initialRouteName="Groups"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Screen
        name="Groups"
        component={Groups}
        options={{
          title: "Grupos",
        }}
      />
      <Screen
        name="Group"
        component={Group}
        options={{
          title: "Grupo",
        }}
      />
      <Screen
        name="CreateOrUpdateGroup"
        component={CreateOrUpdateGroup}
        options={{
          title: "Criar grupo",
        }}
      />
      <Screen
        name="ImportClients"
        component={ImportClients}
        options={{
          title: "Importar clientes",
        }}
      />
    </Navigator>
  );
};
