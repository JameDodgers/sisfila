import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import groupsApi from "../services/api/groups";

import { Group } from "../models/Group";
import { groupsKeys, clientsKeys } from "./keys";

export const useGroupsQueries = (organizationId: string) => {
  const queryClient = useQueryClient();

  const useGetGroups = () =>
    useQuery({
      queryFn: () => groupsApi.getAllFromOrganization(organizationId),
      queryKey: groupsKeys.all(organizationId),
    });

  const useGetGroup = (groupId?: string) =>
    useQuery({
      queryKey: groupsKeys.all(organizationId),
      enabled: !!groupId,
      queryFn: () => groupsApi.getAllFromOrganization(organizationId),
      select: (data) => data.find((group) => group.id === groupId),
    });

  const useCreateGroup = () =>
    useMutation({
      mutationFn: groupsApi.create,
      onSuccess: (group) => {
        queryClient.setQueryData<Group[]>(
          groupsKeys.all(organizationId),
          (groups) => (groups ? [group, ...groups] : [group])
        );
      },
      onSettled: (_data, _error, newGroup) => {
        queryClient.invalidateQueries({
          refetchType: "none",
          queryKey: groupsKeys.all(newGroup.organizationId),
        });
      },
    });

  const useUpdateGroup = () =>
    useMutation({
      mutationFn: groupsApi.update,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: groupsKeys.all(organizationId),
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

  const useDeleteGroup = () =>
    useMutation({
      mutationFn: groupsApi.remove,
      onMutate: async ({ groupId }) => {
        await queryClient.cancelQueries({
          queryKey: groupsKeys.all(organizationId),
        });

        const previousGroups = queryClient.getQueryData<Group[]>(
          groupsKeys.all(organizationId)
        );

        queryClient.setQueryData<Group[]>(
          groupsKeys.all(organizationId),
          (data) => data?.filter((group) => group.id !== groupId)
        );

        return { previousGroups };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousGroups) {
          queryClient.setQueryData<Group[]>(
            groupsKeys.all(organizationId),
            context.previousGroups
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: groupsKeys.all(organizationId),
        });
      },
    });

  return {
    useGetGroups,
    useGetGroup,
    useCreateGroup,
    useUpdateGroup,
    useImportClients,
    useDeleteGroup,
  };
};
