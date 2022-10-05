import React, { FC } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header, getHeaderTitle } from "@react-navigation/elements";
import { DrawerToggleButton } from "@react-navigation/drawer";

const { Navigator, Screen } = createNativeStackNavigator();

type ScreenProp = {
  name: string;
  component: FC;
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
      <Screen
        {...screensProps[0]}
        options={{
          header: ({ route, options }) => (
            <Header
              title={getHeaderTitle(options, route.name)}
              headerLeft={(props) => <DrawerToggleButton {...props} />}
            />
          ),
        }}
      />
      {screensProps.slice(1).map((props: any) => (
        <Screen {...props} />
      ))}
    </Navigator>
  );
};
