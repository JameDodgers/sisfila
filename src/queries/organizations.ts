import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PrivateOrganization } from "../models/Organization";
import { Role } from "../models/User";
import organizationsApi from "../services/api/admin/organizations";
import { useUser } from "../store/auth";
import { setCurrentOrganizationId } from "../store/organizer";

import { organizationsKeys } from "./keys";
import { useUserQueries } from "./user";

export const useOrganizationsQueries = () => {
  const queryClient = useQueryClient();

  const user = useUser();

  const { useSetUserRoleInOrganizationById } = useUserQueries();

  const { mutateAsync: setUserRoleInOrganizationById } =
    useSetUserRoleInOrganizationById();

  const useGetOrganizations = () =>
    useQuery({
      queryFn: organizationsApi.getAll,
      queryKey: organizationsKeys.list(),
    });

  const useGetOrganization = (id: string) =>
    useQuery({
      queryFn: () => organizationsApi.getOne(id),
      initialData: () =>
        queryClient
          .getQueryData<PrivateOrganization[]>(organizationsKeys.list())
          ?.find((organization) => organization.id === id),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(organizationsKeys.list())?.dataUpdatedAt,
      queryKey: organizationsKeys.item(id),
    });

  const useCreateOrganization = () =>
    useMutation({
      mutationFn: organizationsApi.create,
      onSuccess: (data) => {
        queryClient.setQueryData<PrivateOrganization[]>(
          organizationsKeys.list(),
          (organizations) => (organizations ? [...organizations, data] : [data])
        );

        queryClient.setQueryData<PrivateOrganization>(
          organizationsKeys.item(data.id),
          data
        );

        setCurrentOrganizationId(data.id);

        if (user) {
          return setUserRoleInOrganizationById({
            userId: user.id,
            organizationId: data.id,
            role: Role.TYPE_COORDINATOR,
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

        queryClient.setQueryData<PrivateOrganization[]>(
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

  return {
    useGetOrganization,
    useCreateOrganization,
    useUpdateOrganization,
    useDeleteOrganization,
    useGetOrganizations,
  };
};
