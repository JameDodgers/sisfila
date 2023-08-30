import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clientsApi from "../services/api/clients";

import { Client } from "../models/Client";
import { Group } from "../models/Group";
import { clientsKeys, groupsKeys } from "./keys";

export const useClientsQueries = () => {
  const queryClient = useQueryClient();

  const useGetOrganizationClients = (organizationId: string) =>
    useQuery({
      queryFn: () => clientsApi.getOrganizationClients(organizationId),
      queryKey: clientsKeys.all(organizationId),
    });

  const useRemoveClient = () =>
    useMutation({
      mutationFn: clientsApi.remove,
      onMutate: async ({ clientId, organizationId }) => {
        await queryClient.cancelQueries({
          queryKey: clientsKeys.all(organizationId),
        });

        await queryClient.cancelQueries({
          queryKey: groupsKeys.all(organizationId),
        });

        const previousClients = queryClient.getQueryData<Client[]>(
          clientsKeys.all(organizationId)
        );

        queryClient.setQueryData<Client[]>(
          clientsKeys.all(organizationId),
          (data) => data?.filter((client) => client.id !== clientId)
        );

        const previousGroups = queryClient.getQueryData<Group[]>(
          groupsKeys.all(organizationId)
        );

        queryClient.setQueryData<Group[]>(
          groupsKeys.all(organizationId),
          (data) =>
            data?.map((group) => ({
              ...group,
              clients: group.clients.filter((client) => client.id !== clientId),
            }))
        );

        return { previousClients, previousGroups };
      },
      onError: (_err, variables, context) => {
        if (context?.previousClients) {
          queryClient.setQueryData<Client[]>(
            clientsKeys.all(variables.organizationId),
            context.previousClients
          );
        }
        if (context?.previousGroups) {
          queryClient.setQueryData<Group[]>(
            groupsKeys.all(variables.organizationId),
            context.previousGroups
          );
        }
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({
          queryKey: clientsKeys.all(variables.organizationId),
        });

        queryClient.invalidateQueries({
          queryKey: groupsKeys.all(variables.organizationId),
        });
      },
    });

  return { useGetOrganizationClients, useRemoveClient };
};
