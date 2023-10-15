import { useQuery } from "@tanstack/react-query";
import organizationsApi from "../../services/api/organizations";

import { organizationsKeys } from "./keys";

export const useOrganizationsQueries = () => {
  const useGetOrganization = (id: string) =>
    useQuery({
      meta: {
        shouldBeHandledByGlobalErrorHandler: true,
      },
      queryFn: () => organizationsApi.getOne(id),
      queryKey: organizationsKeys.item(id),
    });

  return {
    useGetOrganization,
  };
};
