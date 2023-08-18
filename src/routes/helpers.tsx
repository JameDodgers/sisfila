import React from "react";
import { Platform } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { IconButton } from "react-native-paper";

const { Navigator, Screen } = createNativeStackNavigator();

type ScreenProp = {
  name: string;
  component: any;
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
      {screensProps.map((props: any, index) => (
        <Screen
          {...props}
          key={props.name}
          options={({ navigation }) => ({
            ...screensProps[index].options,
            ...(Platform.OS !== "web" && {
              headerLeft: ({ tintColor, canGoBack }) => {
                if (canGoBack) {
                  return null;
                }

                return (
                  <IconButton
                    icon="menu"
                    iconColor={tintColor}
                    size={24}
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
