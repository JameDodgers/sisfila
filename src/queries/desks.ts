import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { desksKeys } from "./keys";
import { Desk } from "../models/Desk";

import deskApi from "../services/api/desks";

type QueryOptions<TData, TResult> = {
  select?: (data: TData) => TResult;
};

export const useDesksQueries = () => {
  const queryClient = useQueryClient();

  const useGetDesks = <TResult = Desk[]>(
    organizationId: string,
    options?: QueryOptions<Desk[], TResult>
  ) =>
    useQuery({
      queryFn: () => deskApi.getAll(organizationId),
      queryKey: desksKeys.all(organizationId),
      ...options,
    });

  const useCreateDesk = (organizationId: string) =>
    useMutation({
      mutationFn: deskApi.createDesk,
      onSuccess: (desk) => {
        queryClient.setQueryData<Desk[]>(
          desksKeys.all(organizationId),
          (desks) => (desks ? [desk, ...desks] : [desk])
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          refetchType: "none",
          queryKey: desksKeys.all(organizationId),
        });
      },
    });

  const useDeleteDesk = (organizationId: string) =>
    useMutation({
      mutationFn: deskApi.deleteDesk,
      onMutate: async (deskId) => {
        await queryClient.cancelQueries({
          queryKey: desksKeys.all(organizationId),
        });

        const previousDesks = queryClient.getQueryData<Desk[]>(
          desksKeys.all(organizationId)
        );

        queryClient.setQueryData<Desk[]>(
          desksKeys.all(organizationId),
          (data) => data?.filter((desk) => desk.id !== deskId)
        );

        return { previousDesks };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousDesks) {
          queryClient.setQueryData<Desk[]>(
            desksKeys.all(organizationId),
            context.previousDesks
          );
        }
      },
      onSettled: (_data, _error) => {
        queryClient.invalidateQueries({
          queryKey: desksKeys.all(organizationId),
        });
      },
    });

  const useUpdateDesk = (organizationId: string) =>
    useMutation({
      mutationFn: deskApi.updateDesk,
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: desksKeys.all(organizationId),
        });
      },
    });

  return { useGetDesks, useCreateDesk, useDeleteDesk, useUpdateDesk };
};
