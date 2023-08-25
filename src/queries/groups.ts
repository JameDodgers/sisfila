import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import groupsApi from "../services/api/groups";
import { organizationsKeys } from "./organizations";
import { Group } from "../models/Group";

export const useGroupsQueries = () => {
  const queryClient = useQueryClient();

  const useGetGroups = (organizationId: string) =>
    useQuery({
      queryFn: () =>
        groupsApi
          .getOrganizationGroups(organizationId)
          .then((response) => response.data),
      queryKey: groupsKeys.all(organizationId),
    });

  const useCreateGroup = () =>
    useMutation({
      mutationFn: groupsApi.create,
      onMutate: async (newGroup) => {
        await queryClient.cancelQueries({
          queryKey: groupsKeys.all(newGroup.organizationId),
        });

        const previousGroups = queryClient.getQueryData<Group[]>(
          groupsKeys.all(newGroup.organizationId)
        );

        if (previousGroups) {
          queryClient.setQueryData<Group[]>(
            groupsKeys.all(newGroup.organizationId),
            [
              ...previousGroups,
              { id: "", createdAt: "", updatedAt: "", ...newGroup },
            ]
          );
        }

        return { previousGroups };
      },
      onError: (_error, newGroup, context) => {
        queryClient.setQueryData(
          groupsKeys.all(newGroup.organizationId),
          context?.previousGroups
        );
      },
      onSettled: (_data, _error, newGroup) => {
        queryClient.invalidateQueries({
          queryKey: groupsKeys.all(newGroup.organizationId),
        });
      },
    });

  const useImportClients = () =>
    useMutation({
      mutationFn: groupsApi.importClients,
    });

  return { useGetGroups, useCreateGroup, useImportClients };
};

export const groupsKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "groups"],
};
