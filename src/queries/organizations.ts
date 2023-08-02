import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import organizationsApi from "../services/api/organizations";
import { Organization } from "../models/Organization";
import { useUserQueries } from "./user";
import { useUser } from "../store/auth";
import { useDrawer } from "../contexts/drawer";
import queuesApi from "../services/api/queues";
import { Queue } from "../models/Queue";

export const useOrganizationsQueries = () => {
  const queryClient = useQueryClient();

  const user = useUser();

  const { useSetUserRoleInOrganizationById } = useUserQueries();

  const { setOrganizationId } = useDrawer();

  const { mutateAsync: setUserRoleInOrganizationById } =
    useSetUserRoleInOrganizationById();

  const useGetOrganization = (id: string) =>
    useQuery({
      queryFn: () => organizationsApi.getOne(id),
      queryKey: organizationsKeys.item(id),
    });

  const useCreateOrganization = () =>
    useMutation({
      mutationFn: organizationsApi.create,
      onSuccess: (data) => {
        setOrganizationId(data.id);
        if (user) {
          return setUserRoleInOrganizationById({
            userId: user.id,
            organizationId: data.id,
            role: "TYPE_COORDINATOR",
          });
        }
      },
    });

  const useUpdateOrganization = () =>
    useMutation({
      mutationFn: organizationsApi.update,
    });

  const useDeleteOrganization = () =>
    useMutation({
      mutationFn: organizationsApi.remove,
      onMutate: async (id: string) => {
        await queryClient.cancelQueries({
          queryKey: organizationsKeys.list(),
        });

        const previosOrganizations = queryClient.getQueryData(
          organizationsKeys.list()
        );

        queryClient.setQueryData<Organization[]>(
          organizationsKeys.list(),
          (data) => data?.filter((organization) => organization.id !== id)
        );

        return { previosOrganizations };
      },
      onError: (_err, _variables, context) => {
        if (context?.previosOrganizations) {
          queryClient.setQueryData(
            organizationsKeys.list(),
            context.previosOrganizations
          );
        }
      },
      onSuccess: (_data, id) => {
        queryClient.removeQueries({
          queryKey: organizationsKeys.item(id),
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: organizationsKeys.items() });
      },
    });

  const useGetOrganizations = () =>
    useQuery({
      queryFn: organizationsApi.getAll,
      queryKey: organizationsKeys.list(),
    });

  const useGetOrganizationQueues = (organizationId: string) =>
    useQuery({
      queryKey: queuesKeys.list(organizationId),
      queryFn: () =>
        queuesApi.getOne(organizationId).then((response) => response.data),
    });

  const useGetQueue = (queueId: string, organizationId: string) =>
    useQuery({
      queryKey: queuesKeys.item(organizationId, queueId),
      queryFn: () =>
        queuesApi.getQueue(queueId).then((response) => response.data),
    });

  const useCallNext = () =>
    useMutation({
      mutationFn: queuesApi.callNext,
      onMutate: async ({ organizationId, queueId }) => {
        await queryClient.cancelQueries({
          queryKey: queuesKeys.item(organizationId, queueId),
        });

        const oldQueue = queryClient.getQueryData<Queue>(
          queuesKeys.item(organizationId, queueId)
        );

        if (oldQueue) {
          queryClient.setQueryData<Queue>(
            queuesKeys.item(organizationId, queueId),
            {
              ...oldQueue,
              clients: oldQueue.clients.slice(1),
            }
          );
        }

        return { oldQueue };
      },
      onError: (_err, variables, context) => {
        if (context?.oldQueue) {
          queryClient.setQueryData(
            queuesKeys.item(variables.organizationId, variables.queueId),
            context.oldQueue
          );
        }
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({
          queryKey: queuesKeys.item(
            variables.organizationId,
            variables.queueId
          ),
        });
      },
    });

  const useCreateQueue = () =>
    useMutation({
      mutationFn: queuesApi.create,
    });

  const useAttachGroupsToQueue = () =>
    useMutation({
      mutationFn: queuesApi.attachGroupsToQueue,
    });

  return {
    useGetOrganization,
    useCreateOrganization,
    useUpdateOrganization,
    useDeleteOrganization,
    useGetOrganizations,
    useGetOrganizationQueues,
    useGetQueue,
    useCreateQueue,
    useAttachGroupsToQueue,
    useCallNext,
  };
};

export const organizationsKeys = {
  all: ["organizations"],
  list: () => [...organizationsKeys.all, "list"],
  items: () => [...organizationsKeys.all, "item"],
  item: (id: string) => [...organizationsKeys.items(), id],
};

export const queuesKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "queues"],
  list: (id: string) => [...queuesKeys.all(id), "list"],
  items: (id: string) => [...queuesKeys.all(id), "item"],
  item: (organizationId: string, queueId: string) => [
    ...queuesKeys.items(organizationId),
    queueId,
  ],
};
