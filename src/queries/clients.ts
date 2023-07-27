import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clientsApi from "../services/api/clients";
import { organizationsKeys } from "./organizations";
import { Client } from "../models/Client";

export const useClientsQueries = () => {
  const queryClient = useQueryClient();

  const useGetOrganizationClients = (organizationId: string) =>
    useQuery({
      queryFn: () => clientsApi.getOrganizationClients(organizationId),
      queryKey: clientsKeys.list(organizationId),
    });

  const useRemoveClient = () =>
    useMutation({
      mutationFn: clientsApi.remove,
      onMutate: async ({ clientId, organizationId }) => {
        await queryClient.cancelQueries({
          queryKey: clientsKeys.list(organizationId),
        });

        const previosClients = queryClient.getQueryData<Client[]>(
          clientsKeys.list(organizationId)
        );

        queryClient.setQueryData<Client[]>(
          clientsKeys.list(organizationId),
          (data) => data?.filter((client) => client.id !== clientId)
        );

        return { previosClients };
      },
      onError: (_err, variables, context) => {
        if (context?.previosClients) {
          queryClient.setQueryData<Client[]>(
            clientsKeys.list(variables.organizationId),
            context.previosClients
          );
        }
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({
          queryKey: clientsKeys.list(variables.organizationId),
        });
      },
    });

  return { useGetOrganizationClients, useRemoveClient };
};

export const clientsKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "clients"],
  list: (id: string) => [...clientsKeys.all(id), "list"],
  items: (id: string) => [...clientsKeys.all(id), "item"],
  item: (organizationId: string, groupId: string) => [
    ...clientsKeys.items(organizationId),
    groupId,
  ],
};
