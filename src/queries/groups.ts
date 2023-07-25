import { useMutation, useQuery } from "@tanstack/react-query";
import groupsApi from "../services/api/groups";
import { organizationsKeys } from "./organizations";

export const useGroupsQueries = (organizationId: string) => {
  const useGetGroups = () =>
    useQuery({
      queryFn: () =>
        groupsApi
          .getOrganizationGroups(organizationId)
          .then((response) => response.data),
      queryKey: groupsKeys.list(organizationId),
    });

  const useCreateGroup = () =>
    useMutation({
      mutationFn: groupsApi.create,
    });

  const useImportClients = () =>
    useMutation({
      mutationFn: groupsApi.importClients,
    });

  return { useGetGroups, useCreateGroup, useImportClients };
};

export const groupsKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "groups"],
  list: (id: string) => [...groupsKeys.all(id), "list"],
  items: (id: string) => [...groupsKeys.all(id), "item"],
  item: (organizationId: string, groupId: string) => [
    ...groupsKeys.items(organizationId),
    groupId,
  ],
};
