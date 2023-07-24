import { useQuery, useQueryClient } from "@tanstack/react-query";
import organizationsApi from "../services/organizations";

export const useOrganizationsQueries = () => {
  const queryClient = useQueryClient();

  const useGetOrganization = (id: string) =>
    useQuery({
      queryFn: () => organizationsApi.getOne(id),
      queryKey: organizationsKeys.item(id),
    });

  return { useGetOrganization };
};

const organizationsKeys = {
  all: ["organizations"],
  lists: () => [...organizationsKeys.all, "list"],
  list: (filters = {}) => [...organizationsKeys.lists(), filters],
  items: () => [...organizationsKeys.all, "item"],
  item: (id: string) => [...organizationsKeys.items(), id],
};
