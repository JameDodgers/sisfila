import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import {
  NavigatorScreenParams,
  CompositeScreenProps,
  CompositeNavigationProp,
} from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type AppStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList> | undefined;
  Organizations: undefined;
  CreateOrganization: undefined;
};

export type GuestStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Queue: {
    queueId: string;
    serviceId: string;
    registrationId: string;
    queueName: string;
  };
  Organization: { id: string };
};

export type RootNavigatorParamList = AppStackParamList & GuestStackParamList;

export type RootNavigatorScreenProps<T extends keyof RootNavigatorParamList> =
  NativeStackScreenProps<RootNavigatorParamList, T>;

export type DrawerParamList = {
  OrganizationDetails: undefined;
  Attendants: undefined;
  ClientsRoutes: undefined;
  GroupsRoutes: NavigatorScreenParams<GroupsStackParamList>;
  ServicesRoutes: NavigatorScreenParams<ServicesStackParamList>;
  Desks: NavigatorScreenParams<DeskStackParamList>;
};

export type OrganizationDrawerScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    RootNavigatorScreenProps<keyof RootNavigatorParamList>
  >;

export type GroupsStackParamList = {
  Groups: undefined;
  CreateOrUpdateGroup:
    | {
        groupId: string;
      }
    | undefined;
  Group: {
    groupId: string;
  };
  ImportClients: {
    groupId: string;
  };
};

export type GroupsStackScreenProps<T extends keyof GroupsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<GroupsStackParamList, T>,
    OrganizationDrawerScreenProps<keyof DrawerParamList>
  >;

export type ServicesStackParamList = {
  Services: undefined;
  CreateOrUpdateService:
    | {
        serviceId: string;
      }
    | undefined;
  CreateOrUpdateQueue:
    | { serviceId: string; queueId?: never }
    | { serviceId?: never; queueId: string };
};

export type ServicesStackScreenProps<T extends keyof ServicesStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ServicesStackParamList, T>,
    OrganizationDrawerScreenProps<keyof DrawerParamList>
  >;

export type DesksStackParamList = {
  Desks: undefined;
  Desk: { deskId: string };
  CreateOrUpdateDesk: { deskId: string } | undefined;
};

export type DesksStackScreenProps<T extends keyof DesksStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<DesksStackParamList, T>,
    OrganizationDrawerScreenProps<keyof DrawerParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParamList {}
  }
}
