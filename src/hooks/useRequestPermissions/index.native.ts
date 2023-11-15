import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

import messaging from "@react-native-firebase/messaging";

import { useAuthStore } from "../../store/auth";

export const useRequestPermissions = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      let enabled = true;

      if (Platform.OS === "ios") {
        const authStatus = await messaging().requestPermission();

        enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      } else if (Platform.OS === "android" && Platform.Version >= 33) {
        const permissionStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        enabled = permissionStatus === PermissionsAndroid.RESULTS.GRANTED;
      }

      if (enabled) {
        const fcmToken = await messaging().getToken();

        useAuthStore.setState({ fcmToken });
      }
    };
    requestUserPermission();
  }, []);
};
