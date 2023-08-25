import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import servicesApi from "../services/api/services";
import { organizationsKeys } from "./organizations";
import { Service } from "../models/Service";

export const useServicesQueries = () => {
  const queryClient = useQueryClient();

  const useGetServices = (organizationId: string) =>
    useQuery({
      queryKey: servicesKeys.all(organizationId),
      queryFn: () =>
        servicesApi.getOne(organizationId).then((response) => response.data),
    });

  const useCreateService = () =>
    useMutation({
      mutationFn: servicesApi.create,
      onMutate: async (newService) => {
        await queryClient.cancelQueries({
          queryKey: servicesKeys.all(newService.organizationId),
        });

        const previousServices = queryClient.getQueryData<Service[]>(
          servicesKeys.all(newService.organizationId)
        );

        if (previousServices) {
          queryClient.setQueryData<Service[]>(
            servicesKeys.all(newService.organizationId),
            [
              ...previousServices,
              { id: "", createdAt: "", updatedAt: "", ...newService },
            ]
          );
        }

        return { previousServices };
      },
      onError: (_error, newService, context) => {
        queryClient.setQueryData(
          servicesKeys.all(newService.organizationId),
          context?.previousServices
        );
      },
      onSettled: (_data, _error, newService) => {
        queryClient.invalidateQueries({
          queryKey: servicesKeys.all(newService.organizationId),
        });
      },
    });

  return { useGetServices, useCreateService };
};

export const servicesKeys = {
  all: (organizationId: string) => [
    ...organizationsKeys.item(organizationId),
    "services",
  ],
};
