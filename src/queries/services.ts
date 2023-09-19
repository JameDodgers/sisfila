import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import servicesApi from "../services/api/admin/services";
import { Service } from "../models/Service";
import { servicesKeys } from "./keys";

export const useServicesQueries = () => {
  const queryClient = useQueryClient();

  const useGetServices = (organizationId: string) =>
    useQuery({
      queryKey: servicesKeys.all(organizationId),
      queryFn: () => servicesApi.getAllFromOrganization(organizationId),
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

  return { useGetServices, useCreateService };
};
