import { useMutation, useQuery } from "@tanstack/react-query";
import queuesApi from "../services/api/queues";

export const useQueuesQueries = () => {
  const useGetQueue = (queueId: string) =>
    useQuery({
      queryKey: queuesKeys.item(queueId),
      queryFn: () =>
        queuesApi.getQueue(queueId).then((response) => response.data),
      refetchInterval: 1000 * 5,
      refetchIntervalInBackground: true,
    });

  const useEnterQueue = () =>
    useMutation({
      mutationFn: queuesApi.enter,
    });

  return {
    useGetQueue,
    useEnterQueue,
  };
};

export const queuesKeys = {
  all: ["queues"],
  items: () => [...queuesKeys.all, "item"],
  item: (queueId: string) => [...queuesKeys.items(), queueId],
};
``;
