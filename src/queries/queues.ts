import queuesApi from "../services/api/queues";

import { Queue } from "../models/Queue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queuesKeys } from "./keys";

type QueryOptions<TData, TResult> = {
  select?: (data: TData) => TResult;
};

export const useQueuesQueries = (organizationId: string) => {
  const queryClient = useQueryClient();

  const useGetQueues = <TResult = Queue[]>(
    options?: QueryOptions<Queue[], TResult>
  ) =>
    useQuery({
      ...options,
      queryKey: queuesKeys.list(organizationId),
      queryFn: () =>
        queuesApi.getOne(organizationId).then((response) => response.data),
    });

  const useGetQueue = (queueId?: string) =>
    useQuery({
      enabled: !!queueId,
      queryKey: queuesKeys.item(organizationId, queueId || ""),
      initialData: () =>
        queryClient
          .getQueryData<Queue[]>(queuesKeys.list(organizationId))
          ?.find((m) => m.id === queueId),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(queuesKeys.list(organizationId))
          ?.dataUpdatedAt,
      queryFn: () =>
        queuesApi.getQueue(queueId || "").then((response) => response.data),
    });

  const useCreateQueue = () =>
    useMutation({
      mutationFn: queuesApi.create,
      onSuccess(data) {
        queryClient.setQueryData<Queue[]>(
          queuesKeys.list(organizationId),
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

  const useUpdateQueue = () =>
    useMutation({
      mutationFn: queuesApi.update,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queuesKeys.all(organizationId),
        });
      },
    });

  const useDeleteQueue = () =>
    useMutation({
      mutationFn: queuesApi.remove,
      onMutate: async ({ queueId }) => {
        await queryClient.cancelQueries({
          queryKey: queuesKeys.all(organizationId),
        });

        const previousQueues = queryClient.getQueryData<Queue[]>(
          queuesKeys.all(organizationId)
        );

        queryClient.setQueryData<Queue[]>(
          queuesKeys.all(organizationId),
          (data) => data?.filter((queue) => queue.id !== queueId)
        );

        return { previousQueues };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousQueues) {
          queryClient.setQueryData<Queue[]>(
            queuesKeys.all(organizationId),
            context.previousQueues
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: queuesKeys.all(organizationId),
        });
      },
    });

  return {
    useGetQueues,
    useGetQueue,
    useCreateQueue,
    useUpdateQueue,
    useDeleteQueue,
  };
};
