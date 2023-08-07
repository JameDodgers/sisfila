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
  Drawer: NavigatorScreenParams<DrawerParamList>;
  Organizations: undefined;
  CreateOrganization: undefined;
  Atendimento: { queueId: string };
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type RootNavigatorParamList = AppStackParamList & AuthStackParamList;

export type RootNavigatorScreenProps<T extends keyof RootNavigatorParamList> =
  NativeStackScreenProps<RootNavigatorParamList, T>;

export type DrawerParamList = {
  ClientsRoutes: NavigatorScreenParams<ClientsStackParamList>;
  GroupsRoutes: NavigatorScreenParams<GroupsStackParamList>;
  ServicesRoutes: NavigatorScreenParams<ServicesStackParamList>;
  QueuesRoutes: NavigatorScreenParams<QueuesStackParamList>;
};

export type OrganizationDrawerScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    RootNavigatorScreenProps<keyof RootNavigatorParamList>
  >;

export type ClientsStackParamList = {
  Clients: undefined;
  ImportClients: undefined;
};
export type ClientsStackNavigationProp<T extends keyof ClientsStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<ClientsStackParamList, T>,
    OrganizationDrawerScreenProps<keyof DrawerParamList>["navigation"]
  >;

export type GroupsStackParamList = {
  Groups: undefined;
  CreateGroup: undefined;
};

export type GroupsStackNavigationProp<T extends keyof GroupsStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<GroupsStackParamList, T>,
    OrganizationDrawerScreenProps<keyof DrawerParamList>["navigation"]
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
  Queue: { queueId: string };
  QueueSettings: { queueId: string };
  CreateQueue: undefined;
};

export type QueuesStackScreenProps<T extends keyof QueuesStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<QueuesStackParamList, T>,
    OrganizationDrawerScreenProps<keyof DrawerParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParamList {}
  }
}
