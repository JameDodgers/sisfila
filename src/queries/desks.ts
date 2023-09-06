import { useQuery } from "@tanstack/react-query";

import { desksKeys } from "./keys";
import { Attendant } from "../models/Attendant";

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

export const useDesksQueries = () => {
  const useGetDesks = (organizationId: string) =>
    useQuery({
      queryFn: () =>
        new Promise<Attendant[]>((resolve) =>
          setTimeout(() => resolve(desks), 1000)
        ),
      queryKey: desksKeys.all(organizationId),
    });

  return { useGetDesks };
};
