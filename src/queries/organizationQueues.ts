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

  const useCreateQueue = () =>
    useMutation({
      mutationFn: queuesApi.create,
      onSuccess(data, variables) {
        queryClient.setQueryData<Queue[]>(
          queuesKeys.list(variables.organizationId),
          (queues) => (queues ? [data, ...queues] : [data])
        );
      },
      onSettled: (_data, _error, newQueue) => {
        queryClient.invalidateQueries({
          refetchType: "none",
          queryKey: queuesKeys.list(newQueue.organizationId),
        });
      },
    });

  const useAttachGroupsToQueue = () =>
    useMutation({
      mutationFn: queuesApi.attachGroupsToQueue,
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: queuesKeys.item(
            variables.organizationId,
            variables.queueId
          ),
        });
      },
    });

  return {
    useGetQueues,
    useGetQueue,
    useCreateQueue,
    useAttachGroupsToQueue,
  };
};
