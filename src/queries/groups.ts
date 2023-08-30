import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import groupsApi from "../services/api/groups";

import { Group } from "../models/Group";
import { groupsKeys, clientsKeys } from "./keys";

// https://github.com/TanStack/query/discussions/5800
// https:github.com/TanStack/query/discussions/3227
type QueryOptions<TData, TResult> = {
  select?: (data: TData) => TResult;
};

export const useGroupsQueries = () => {
  const queryClient = useQueryClient();

  const useGetGroups = <TResult = Group[]>(
    organizationId: string,
    options?: QueryOptions<Group[], TResult>
  ) =>
    useQuery({
      queryFn: () =>
        groupsApi
          .getOrganizationGroups(organizationId)
          .then((response) => response.data),
      queryKey: groupsKeys.all(organizationId),
      ...options,
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
              {
                id: "",
                createdAt: "",
                updatedAt: "",
                clients: [],
                ...newGroup,
              },
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
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: groupsKeys.all(variables.organizationId),
        });
        queryClient.invalidateQueries({
          queryKey: clientsKeys.all(variables.organizationId),
        });
      },
    });

  return { useGetGroups, useCreateGroup, useImportClients };
};
