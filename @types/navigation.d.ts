import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import type { StackScreenProps } from "@react-navigation/stack";

export type RootDrawerParamList = {
  HomeRoutes: NavigatorScreenParams<HomeStackParamList>;
  OrganizationRoutes: NavigatorScreenParams<OrganizationStackParamList>;
};

export type RootDrawerScreenProps<T extends keyof RootDrawerParamList> =
  NativeStackScreenProps<RootDrawerParamList, T>;

export type HomeStackParamList = {
  Home: undefined;
  Organization: {
    id: number;
  };
};

export type OrganizationStackParamList = {
  Organization: {
    id?: number;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootDrawerParamList {}
  }
}
