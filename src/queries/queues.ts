import { useMutation, useQuery } from "@tanstack/react-query";
import queuesApi from "../services/api/queues";

export const useQueuesQueries = () => {
  const useGetQueue = (queueId: string) =>
    useQuery({
      queryKey: queuesKeys.item(queueId),
      queryFn: () =>
        queuesApi.getQueue(queueId).then((response) => response.data),
    });

  const useCreateQueue = () =>
    useMutation({
      mutationFn: queuesApi.create,
    });

  const useAttachGroupsToQueue = () =>
    useMutation({
      mutationFn: queuesApi.attachGroupsToQueue,
    });

  return { useGetQueue, useCreateQueue, useAttachGroupsToQueue };
};

export const queuesKeys = {
  all: ["queues"],
  items: () => [...queuesKeys.all, "item"],
  item: (queueId: string) => [...queuesKeys.items(), queueId],
};
