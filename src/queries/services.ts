import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import servicesApi from "../services/api/admin/services";
import { Service } from "../models/Service";
import { servicesKeys } from "./keys";

export const useServicesQueries = (organizationId: string) => {
  const queryClient = useQueryClient();

  const useGetServices = () =>
    useQuery({
      queryKey: servicesKeys.all(organizationId),
      queryFn: () => servicesApi.getAllFromOrganization(organizationId),
    });

  const useGetService = (serviceId?: string) =>
    useQuery({
      queryKey: servicesKeys.all(organizationId),
      enabled: !!serviceId,
      queryFn: () => servicesApi.getAllFromOrganization(organizationId),
      select: (data) => data.find((service) => service.id === serviceId),
    });

  const useCreateService = () =>
    useMutation({
      mutationFn: servicesApi.create,
      onSuccess: (service, variables) => {
        queryClient.setQueryData<Service[]>(
          servicesKeys.all(variables.organizationId),
          (services) => (services ? [service, ...services] : [service])
        );
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({
          refetchType: "none",
          queryKey: servicesKeys.all(variables.organizationId),
        });
      },
    });

  const useDeleteService = () =>
    useMutation({
      mutationFn: servicesApi.remove,
      onMutate: async (serviceId) => {
        await queryClient.cancelQueries({
          queryKey: servicesKeys.all(organizationId),
        });

        const previousServices = queryClient.getQueryData<Service[]>(
          servicesKeys.all(organizationId)
        );

        queryClient.setQueryData<Service[]>(
          servicesKeys.all(organizationId),
          (data) => data?.filter((service) => service.id !== serviceId)
        );

        return { previousServices };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousServices) {
          queryClient.setQueryData<Service[]>(
            servicesKeys.all(organizationId),
            context.previousServices
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: servicesKeys.all(organizationId),
        });
      },
    });

  const useUpdateService = () =>
    useMutation({
      mutationFn: servicesApi.update,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: servicesKeys.all(organizationId),
        });
      },
    });

  return {
    useGetServices,
    useGetService,
    useCreateService,
    useUpdateService,
    useDeleteService,
  };
};
