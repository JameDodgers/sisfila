import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawerContent from "../components/CustomDrawerContent";

import { Platform } from "react-native";
import { GroupsRoutes } from "./groups.routes";
import { ServicesRoutes } from "./services.routes";
import { DesksRoutes } from "./desks.routes";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import { OrganizationDetails } from "../screens/Member/OrganizationDetails";
import { Attendants } from "../screens/Member/Attendants";
import { Clients } from "../screens/Member/Clients";
import { setCurrentOrganizationId } from "../store/organizer";
import { useOrganizationsQueries } from "../queries/organizations";
import { Role } from "../models/User";
import { RootNavigatorScreenProps } from "../../@types/navigation";
import { useEffect } from "react";

const { Navigator, Screen } = createDrawerNavigator();

type Props = {
  route: RootNavigatorScreenProps<"Drawer">["route"];
};

export const DrawerRoutes = ({ route }: Props) => {
  const { organizationId } = route.params;

  useEffect(() => {
    setCurrentOrganizationId(organizationId);
  }, [organizationId]);

  const { useGetOrganization } = useOrganizationsQueries();

  const { data: organization } = useGetOrganization(organizationId);

  return (
    <Navigator
      initialRouteName="OrganizationDetails"
      defaultStatus={Platform.select({
        web: "open",
        default: "closed",
      })}
      screenOptions={{
        drawerType: Platform.select({
          web: "permanent",
          ios: "slide",
          android: "front",
        }),
        ...(Platform.OS === "web" && {
          overlayColor: "transparent",
        }),
        header: (props) => <CustomNavigationBar {...props} />,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {organization?.userRoleInOrganization === Role.TYPE_COORDINATOR && (
        <>
          <Screen
            name="OrganizationDetails"
            options={{
              title: "Organização",
            }}
            component={OrganizationDetails}
          />
          <Screen
            name="Attendants"
            options={{
              title: "Atendentes",
            }}
            component={Attendants}
          />
          <Screen
            name="ClientsRoutes"
            options={{
              title: "Clientes",
            }}
            component={Clients}
          />
          <Screen
            name="GroupsRoutes"
            options={{
              title: "Grupos",
              headerShown: false,
            }}
            component={GroupsRoutes}
          />
          <Screen
            name="ServicesRoutes"
            options={{
              title: "Serviços",
              headerShown: false,
            }}
            component={ServicesRoutes}
          />
        </>
      )}
      <Screen
        name="DesksRoutes"
        options={{
          title: "Guichês",
          headerShown: false,
        }}
        component={DesksRoutes}
      />
    </Navigator>
  );
};
