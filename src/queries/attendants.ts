import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Attendant } from "../models/Attendant";
import { User } from "../models/User";
import usersApi from "../services/api/users";
import { useUser } from "../store/auth";

import { attendantsKeys } from "./keys";

export const useAttendantsQueries = () => {
  const queryClient = useQueryClient();

  const user = useUser();

  const useGetAttendants = (organizationId: string) =>
    useQuery({
      queryFn: () => usersApi.getAllFromOrganization(organizationId),
      queryKey: attendantsKeys.all(organizationId),
      select: (data) => data.filter((u) => u.id !== user?.id),
    });

  const useAddAttendant = () =>
    useMutation({
      mutationFn: usersApi.setUserRoleInOrganizationByEmail,
      onSuccess: (user, variables) => {
        queryClient.setQueryData<User[]>(
          attendantsKeys.all(variables.organizationId),
          (users) => (users ? [user, ...users] : [user])
        );
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({
          refetchType: "none",
          queryKey: attendantsKeys.all(variables.organizationId),
        });
      },
    });

  const useRemoveAttendant = () =>
    useMutation({
      mutationFn: usersApi.removeUserFromOrganizationById,
      onMutate: async ({ userId, organizationId }) => {
        await queryClient.cancelQueries({
          queryKey: attendantsKeys.all(organizationId),
        });

        const previousAttendants = queryClient.getQueryData<Attendant[]>(
          attendantsKeys.all(organizationId)
        );

        queryClient.setQueryData<Attendant[]>(
          attendantsKeys.all(organizationId),
          (data) => data?.filter((attendant) => attendant.id !== userId)
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
