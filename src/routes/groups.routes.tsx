import { Groups } from "../screens/Member/Groups";
import { CreateGroup } from "../screens/Member/CreateGroup";

import { ImportClients } from "../screens/Member/ImportClients";
import { Group } from "../screens/Member/Group";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomNavigationBar } from "../components/CustomNavigationBar";

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
        name="CreateGroup"
        component={CreateGroup}
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
