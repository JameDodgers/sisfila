import { useMutation } from "@tanstack/react-query";

import servicesApi from "../../services/api/services";

export const useServicesQueries = () => {
  const useEnterService = () =>
    useMutation({
      mutationFn: servicesApi.enter,
    });

  return {
    useEnterService,
  };
};
