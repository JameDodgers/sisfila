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
    },
    android: {
      package: "com.sisfila",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      expoClientId: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
      androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      eas: {
        projectId: "515731f1-e512-42a3-9ed7-d338898e50aa",
      },
    },
  },
};
