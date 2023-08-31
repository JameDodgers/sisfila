import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { attendantsKeys } from "./keys";
import { Attendant } from "../models/Attendant";
import {
  AddAttendantParams,
  RemoveAttendantParams,
} from "../services/api/attendants";

const attendants = [
  {
    id: "1",
    name: "John Doe",
  },
  {
    id: "2",
    name: "John Doe",
  },
];

export const useAttendantsQueries = () => {
  const queryClient = useQueryClient();

  const useGetAttendants = (organizationId: string) =>
    useQuery({
      queryFn: () =>
        new Promise<Attendant[]>((resolve) =>
          setTimeout(() => resolve(attendants), 1000)
        ),
      queryKey: attendantsKeys.all(organizationId),
    });

  const useAddAttendant = () =>
    useMutation({
      mutationFn: (variables: AddAttendantParams) =>
        new Promise<void>((resolve) => setTimeout(() => resolve(), 1000)),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: attendantsKeys.all(variables.organizationId),
        });
      },
    });

  const useRemoveAttendant = () =>
    useMutation({
      mutationFn: (variables: RemoveAttendantParams) =>
        new Promise<void>((resolve) => setTimeout(() => resolve(), 1000)),
      onMutate: async ({ attendantId, organizationId }) => {
        await queryClient.cancelQueries({
          queryKey: attendantsKeys.all(organizationId),
        });

        const previousAttendants = queryClient.getQueryData<Attendant[]>(
          attendantsKeys.all(organizationId)
        );

        queryClient.setQueryData<Attendant[]>(
          attendantsKeys.all(organizationId),
          (data) => data?.filter((attendant) => attendant.id !== attendantId)
        );

        return { previousAttendants };
      },
      onError: (_err, variables, context) => {
        if (context?.previousAttendants) {
          queryClient.setQueryData<Attendant[]>(
            attendantsKeys.all(variables.organizationId),
            context.previousAttendants
          );
        }
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({
          queryKey: attendantsKeys.all(variables.organizationId),
        });
      },
    });

  return { useGetAttendants, useAddAttendant, useRemoveAttendant };
};
