import { useQuery } from "@tanstack/react-query";

import { desksKeys } from "./keys";
import { Desk } from "../models/Desk";

const desks = [
  {
    id: "1",
    name: "Mesa 1",
  },
  {
    id: "2",
    name: "Mesa 2",
  },
];

type QueryOptions<TData, TResult> = {
  select?: (data: TData) => TResult;
};

export const useDesksQueries = () => {
  const useGetDesks = <TResult = Desk[]>(
    organizationId: string,
    options?: QueryOptions<Desk[], TResult>
  ) =>
    useQuery({
      queryFn: () =>
        new Promise<Desk[]>((resolve) =>
          setTimeout(() => resolve(desks), 1000)
        ),
      queryKey: desksKeys.all(organizationId),
      ...options,
    });

  return { useGetDesks };
};
