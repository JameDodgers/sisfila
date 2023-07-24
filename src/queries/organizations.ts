import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import organizationsApi from "../services/api/organizations";
import { Organization } from "../models/Organization";
import { useUserQueries } from "./user";
import { useUser } from "../store/auth";

export const useOrganizationsQueries = () => {
  const queryClient = useQueryClient();

  const user = useUser();

  const { useSetUserRoleInOrganizationById } = useUserQueries();

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

  return {
    useGetOrganization,
    useCreateOrganization,
    useUpdateOrganization,
    useDeleteOrganization,
    useGetOrganizations,
  };
};

export const organizationsKeys = {
  all: ["organizations"],
  list: () => [...organizationsKeys.all, "list"],
  items: () => [...organizationsKeys.all, "item"],
  item: (id: string) => [...organizationsKeys.items(), id],
};