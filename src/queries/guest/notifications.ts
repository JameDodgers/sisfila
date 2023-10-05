import { useMutation } from "@tanstack/react-query";
import notificationsApi from "../../services/api/notifications";

export const useNotificationsQueries = () => {
  const useAddTokenToClient = () =>
    useMutation({
      mutationFn: notificationsApi.addTokenToClient,
    });

  const useSubscribeToQueue = () =>
    useMutation({
      mutationFn: notificationsApi.subscribeToQueue,
    });

  return { useAddTokenToClient, useSubscribeToQueue };
};
