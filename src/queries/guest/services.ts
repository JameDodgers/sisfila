import { useMutation, useQuery } from "@tanstack/react-query";
import servicesApi from "../../services/api/services";
import { servicesKeys } from "../keys";
import { useNotificationsQueries } from "./notifications";
import { useAuthStore } from "../../store/auth";

export const useServicesQueries = () => {
  const { fcmToken } = useAuthStore();

  const { useAddTokenToClient, useSubscribeToQueue } =
    useNotificationsQueries();

  const { mutateAsync: addTokenToClient } = useAddTokenToClient();

  const { mutateAsync: subscribeToQueue } = useSubscribeToQueue();

  const useGetServices = (organizationId: string) =>
    useQuery({
      queryKey: servicesKeys.all(organizationId),
      queryFn: () => servicesApi.getAllFromOrganization(organizationId),
    });

  const useEnterService = () =>
    useMutation({
      mutationFn: servicesApi.enter,
      onSuccess: async (data, variables) => {
        const { queueId } = data;
        const { registrationId, organizationId } = variables;

        if (fcmToken) {
          await addTokenToClient({
            registrationId,
            organizationId,
            token: fcmToken,
          });
          await subscribeToQueue({ token: fcmToken, queueId });
        }
      },
    });

  return { useGetServices, useEnterService };
};
