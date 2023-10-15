import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import servicesApi, {
  GetClientPositionInServiceParams,
  GetClientPositionInServiceResponse,
} from "../../services/api/services";

import { useNotificationsQueries } from "./notifications";
import { useAuthStore } from "../../store/auth";
import { servicesKeys } from "./keys";

type UseGetServices = {
  organizationId: string;
  enabled?: boolean;
};

export const useServicesQueries = () => {
  const queryClient = useQueryClient();

  const { fcmToken } = useAuthStore();

  const { useAddTokenToClient, useSubscribeToQueue } =
    useNotificationsQueries();

  const { mutateAsync: addTokenToClient } = useAddTokenToClient();

  const { mutateAsync: subscribeToQueue } = useSubscribeToQueue();

  const useGetServices = ({ organizationId, enabled }: UseGetServices) =>
    useQuery({
      queryKey: servicesKeys.list(organizationId),
      queryFn: () => servicesApi.getAllFromOrganization(organizationId),
      enabled,
    });

  const useEnterService = () =>
    useMutation({
      mutationFn: servicesApi.enter,
      onSuccess: async (data, variables) => {
        const { queueId, position } = data;
        const { registrationId, organizationId, serviceId } = variables;

        queryClient.setQueryData<GetClientPositionInServiceResponse>(
          servicesKeys.position(serviceId, registrationId),
          (data) => (data ? { ...data, position } : { position })
        );

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

  const getClientPositionInService = (
    params: GetClientPositionInServiceParams
  ) =>
    useQuery({
      queryKey: servicesKeys.position(params.serviceId, params.registrationId),
      queryFn: () => servicesApi.getClientPositionInService(params),
      refetchInterval: 1000 * 5,
      refetchIntervalInBackground: true,
    });

  return { useGetServices, useEnterService, getClientPositionInService };
};
