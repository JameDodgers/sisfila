import { useMutation, useQuery } from "@tanstack/react-query";
import servicesApi from "../../services/api/services";
import { servicesKeys } from "../keys";
import { useNotificationsQueries } from "./notifications";
import { useAuthStore } from "../../store/auth";

type UseGetServices = {
  organizationId: string;
  enabled?: boolean;
};

export const useServicesQueries = () => {
  const { fcmToken } = useAuthStore();

  const { useAddTokenToClient, useSubscribeToQueue } =
    useNotificationsQueries();

  const { mutateAsync: addTokenToClient } = useAddTokenToClient();

  const { mutateAsync: subscribeToQueue } = useSubscribeToQueue();

  const useGetServices = ({ organizationId, enabled }: UseGetServices) =>
    useQuery({
      queryKey: servicesKeys.all(organizationId),
      queryFn: () => servicesApi.getAllFromOrganization(organizationId),
      enabled,
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
