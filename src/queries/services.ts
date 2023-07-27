import { useMutation, useQuery } from "@tanstack/react-query";
import servicesApi from "../services/api/services";

export const useServicesQueries = () => {
  const useGetServices = (serviceId: string) =>
    useQuery({
      queryKey: servicesKeys.item(serviceId),
      queryFn: () =>
        servicesApi.getOne(serviceId).then((response) => response.data),
    });

  const useCreateService = () =>
    useMutation({
      mutationFn: servicesApi.create,
    });

  return { useGetServices, useCreateService };
};

export const servicesKeys = {
  all: ["services"],
  items: () => [...servicesKeys.all, "item"],
  item: (serviceId: string) => [...servicesKeys.items(), serviceId],
};
