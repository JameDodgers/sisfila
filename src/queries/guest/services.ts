import { useMutation, useQuery } from "@tanstack/react-query";
import servicesApi from "../../services/api/services";
import { servicesKeys } from "../keys";

export const useServicesQueries = () => {
  const useGetServices = (organizationId: string) =>
    useQuery({
      queryKey: servicesKeys.all(organizationId),
      queryFn: () => servicesApi.getAllFromOrganization(organizationId),
    });

  const useEnterService = () =>
    useMutation({
      mutationFn: servicesApi.enter,
    });

  return { useGetServices, useEnterService };
};
