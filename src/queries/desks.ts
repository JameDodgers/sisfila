import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Client } from "../models/Client";
import { Desk } from "../models/Desk";
import desksApi from "../services/api/desks";
import { useUser } from "../store/auth";

import { desksKeys } from "./keys";

export const useDesksQueries = (organizationId: string) => {
  const queryClient = useQueryClient();

  const user = useUser();

  const useGetDesks = () =>
    useQuery({
      queryFn: () => desksApi.getAll(organizationId),
      queryKey: desksKeys.list(organizationId),
      select: (desks) =>
        [...desks].sort(
          (a, b) =>
            Number(b.attendantId === user?.id) -
            Number(a.attendantId === user?.id)
        ),
    });

  const useGetDesk = (deskId = "") =>
    useQuery({
      enabled: !!deskId,
      queryKey: desksKeys.item(organizationId, deskId),
      initialData: () =>
        queryClient
          .getQueryData<Desk[]>(desksKeys.list(organizationId))
          ?.find((m) => m.id === deskId),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(desksKeys.list(organizationId))
          ?.dataUpdatedAt,
      queryFn: async () => {
        const data = await desksApi.getOne({ organizationId, deskId });

        queryClient.setQueryData<Client>(
          desksKeys.client(organizationId, deskId),
          data.lastClientCalled
        );

        return data.desk;
      },
    });

  // https://github.com/TanStack/query/discussions/846#discussioncomment-6885174
  const useGetLastClientCalledInDesk = (deskId: string) =>
    useQuery<Client>({
      queryKey: desksKeys.client(organizationId, deskId),
      enabled: false,
    });

  const useCreateDesk = () =>
    useMutation({
      mutationFn: desksApi.createDesk,
      onSuccess: (desk) => {
        queryClient.setQueryData<Desk[]>(
          desksKeys.list(organizationId),
          (desks) => (desks ? [desk, ...desks] : [desk])
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          refetchType: "none",
          queryKey: desksKeys.list(organizationId),
        });
      },
    });

  const useDeleteDesk = () =>
    useMutation({
      mutationFn: desksApi.deleteDesk,
      onMutate: async (deskId) => {
        await queryClient.cancelQueries({
          queryKey: desksKeys.list(organizationId),
        });

        const previousDesks = queryClient.getQueryData<Desk[]>(
          desksKeys.list(organizationId)
        );

        queryClient.setQueryData<Desk[]>(
          desksKeys.list(organizationId),
          (data) => data?.filter((desk) => desk.id !== deskId)
        );

        return { previousDesks };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousDesks) {
          queryClient.setQueryData<Desk[]>(
            desksKeys.list(organizationId),
            context.previousDesks
          );
        }
      },
      onSettled: (_data, _error) => {
        queryClient.invalidateQueries({
          queryKey: desksKeys.list(organizationId),
        });
      },
    });

  const useUpdateDesk = () =>
    useMutation({
      mutationFn: desksApi.updateDesk,
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: desksKeys.list(organizationId),
        });
      },
    });

  const useCallNext = () =>
    useMutation({
      mutationFn: desksApi.callNext,
      onSuccess: (data, deskId) => {
        queryClient.setQueryData<Client>(
          desksKeys.client(organizationId, deskId),
          data.client
        );

        queryClient.setQueryDefaults(desksKeys.client(organizationId, deskId), {
          cacheTime: Infinity,
        });

        if (data.desk) {
          queryClient.setQueryData<Desk>(
            desksKeys.item(organizationId, deskId),
            data.desk
          );
        }
      },
    });

  return {
    useGetDesks,
    useGetDesk,
    useGetLastClientCalledInDesk,
    useCreateDesk,
    useDeleteDesk,
    useUpdateDesk,
    useCallNext,
  };
};
