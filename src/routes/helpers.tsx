import React, { FC } from "react";
import { Platform } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Button, Icon, IconButton, Text } from "native-base";

import Feather from "@expo/vector-icons/Feather";

const { Navigator, Screen } = createNativeStackNavigator();

type ScreenProp = {
  name: string;
  component: FC;
  options?: any;
};

type Params = {
  initialRouteName: string;
  screensProps: ScreenProp[];
};

export const getStackAndScreensInsideDrawer = ({
  initialRouteName,
  screensProps,
}: Params) => {
  return () => (
    <Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      {screensProps.map((props: any) => (
        <Screen
          {...props}
          key={props.name}
          options={({ navigation }) => ({
            ...screensProps[0].options,
            ...(Platform.OS !== "web" && {
              headerLeft: ({ tintColor, canGoBack }) => {
                if (canGoBack) {
                  return null;
                }

                return (
                  <IconButton
                    size="sm"
                    variant="link"
                    icon={<Feather name="menu" size={24} color={tintColor} />}
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  />
                );
              },
            }),
          })}
        />
      ))}
    </Navigator>
  );
};
