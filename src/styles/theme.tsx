import {
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import generatedLightScheme from "./generatedLightScheme.json";
import generatedDarkScheme from "./generatedDarkScheme.json";

const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...generatedLightScheme.colors,
  },
};

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...generatedDarkScheme.colors,
  },
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
  materialLight: customLightTheme,
  materialDark: customDarkTheme,
});

export const CombinedDefaultTheme = {
  ...customLightTheme,
  ...LightTheme,
  colors: {
    ...customLightTheme.colors,
    ...LightTheme.colors,
  },
};
export const CombinedDarkTheme = {
  ...customDarkTheme,
  ...DarkTheme,
  colors: {
    ...customDarkTheme.colors,
    ...DarkTheme.colors,
  },
};
