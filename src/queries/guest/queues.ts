import { useQuery } from "@tanstack/react-query";
import queuesApi from "../../services/api/queues";
import { publicQueuesKeys } from "../keys";

export const useQueuesQueries = () => {
  const useGetQueue = (queueId: string) =>
    useQuery({
      queryKey: publicQueuesKeys.item(queueId),
      queryFn: () =>
        queuesApi.getQueue(queueId).then((response) => response.data),
      refetchInterval: 1000 * 5,
      refetchIntervalInBackground: true,
    });

  return {
    useGetQueue,
  };
};
