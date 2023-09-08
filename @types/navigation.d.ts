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
  SignIn: undefined;
  SignUp: undefined;
  Queue: { queueId: string };
  Organization: { id: string };
};

export type RootNavigatorParamList = AppStackParamList & GuestStackParamList;

export type RootNavigatorScreenProps<T extends keyof RootNavigatorParamList> =
  NativeStackScreenProps<RootNavigatorParamList, T>;

export type DrawerParamList = {
  ClientsRoutes: NavigatorScreenParams<ClientsStackParamList>;
  GroupsRoutes: NavigatorScreenParams<GroupsStackParamList>;
  ServicesRoutes: NavigatorScreenParams<ServicesStackParamList>;
  QueuesRoutes: NavigatorScreenParams<QueuesStackParamList>;
  Desks: NavigatorScreenParams<DeskStackParamList>;
  Attendants: undefined;
};

export type OrganizationDrawerScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    RootNavigatorScreenProps<keyof RootNavigatorParamList>
  >;

export type ClientsStackParamList = {
  Clients: undefined;
};
export type ClientsStackNavigationProp<T extends keyof ClientsStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<ClientsStackParamList, T>,
    OrganizationDrawerScreenProps<keyof DrawerParamList>["navigation"]
  >;

export type GroupsStackParamList = {
  Groups: undefined;
  CreateGroup: undefined;
  Group: {
    id: string;
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
  CreateService: undefined;
};

export type ServicesStackNavigationProp<
  T extends keyof ServicesStackParamList
> = CompositeNavigationProp<
  NativeStackNavigationProp<ServicesStackParamList, T>,
  OrganizationDrawerScreenProps<keyof DrawerParamList>["navigation"]
>;

export type QueuesStackParamList = {
  Queues: undefined;
  QueueSettings: { queueId: string };
  CreateQueue: undefined;
};

export type QueuesStackScreenProps<T extends keyof QueuesStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<QueuesStackParamList, T>,
    OrganizationDrawerScreenProps<keyof DrawerParamList>
  >;

export type DesksStackParamList = {
  Desks: undefined;
  Desk: { deskId: string; name: string };
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
