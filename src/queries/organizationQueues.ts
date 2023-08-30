import queuesApi from "../services/api/queues";

import { Queue } from "../models/Queue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queuesKeys } from "./keys";

export const useOrganizationQueuesQueries = () => {
  const queryClient = useQueryClient();

  const useGetQueues = (organizationId: string) =>
    useQuery({
      queryKey: queuesKeys.list(organizationId),
      queryFn: () =>
        queuesApi.getOne(organizationId).then((response) => response.data),
    });

  const useGetQueue = (queueId: string, organizationId: string) =>
    useQuery({
      queryKey: queuesKeys.item(organizationId, queueId),
      queryFn: () =>
        queuesApi.getQueue(queueId).then((response) => response.data),
    });

  const useCallNext = () =>
    useMutation({
      mutationFn: queuesApi.callNext,
      onMutate: async ({ organizationId, queueId }) => {
        await queryClient.cancelQueries({
          queryKey: queuesKeys.item(organizationId, queueId),
        });

        const oldQueue = queryClient.getQueryData<Queue>(
          queuesKeys.item(organizationId, queueId)
        );

        if (oldQueue) {
          queryClient.setQueryData<Queue>(
            queuesKeys.item(organizationId, queueId),
            {
              ...oldQueue,
              clients: oldQueue.clients.slice(1),
            }
          );
        }

        return { oldQueue };
      },
      onError: (_err, variables, context) => {
        if (context?.oldQueue) {
          queryClient.setQueryData(
            queuesKeys.item(variables.organizationId, variables.queueId),
            context.oldQueue
          );
        }
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({
          queryKey: queuesKeys.item(
            variables.organizationId,
            variables.queueId
          ),
        });
      },
    });

  const useCreateQueue = () =>
    useMutation({
      mutationFn: queuesApi.create,
    });

  const useAttachGroupsToQueue = () =>
    useMutation({
      mutationFn: queuesApi.attachGroupsToQueue,
    });

  return {
    useGetQueues,
    useGetQueue,
    useCreateQueue,
    useAttachGroupsToQueue,
    useCallNext,
  };
};
