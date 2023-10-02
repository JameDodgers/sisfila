module.exports = {
  expo: {
    name: "sisfila",
    slug: "sisfila",
    scheme: "sisfila",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.sisfila",
      googleServicesFile: "./GoogleService-Info.plist",
    },
    android: {
      package: "com.sisfila",
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      permissions: ["android.permission.POST_NOTIFICATIONS"],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      expoClientId: process.env.EXPO_CLIENT_ID,
      iosClientId: process.env.IOS_CLIENT_ID,
      androidClientId: process.env.ANDROID_CLIENT_ID,
      webClientId: process.env.WEB_CLIENT_ID,
      eas: {
        projectId: "515731f1-e512-42a3-9ed7-d338898e50aa",
      },
    },
    plugins: [
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
  },
};
