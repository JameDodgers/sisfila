import { useQuery } from "@tanstack/react-query";

import organizationsApi from "../../services/api/organizations";
import { Service } from "../../models/Service";

const services = [
  {
    id: "73be6348-a46d-4371-8a28-70988f39f7b7",
    name: "Matrícula",
    subscriptionToken: "ABCDEF",
    guestEnroll: true,
    open: true,
    opensAt: "2022-12-19T23:03:44.662Z",
    closesAt: "2022-12-19T23:03:44.662Z",
    createdAt: "2022-12-19T23:03:44.662Z",
    updatedAt: "2022-12-19T23:03:44.662Z",
    organizationId: "71195bc5-d2b9-4f3e-8932-dd674374ffc6",
  },
  {
    id: "73be6348-a46d-4371-8a28-70988f39f7b7",
    name: "Reajuste",
    subscriptionToken: "ABCDEF",
    guestEnroll: true,
    open: true,
    opensAt: "2022-12-19T00:00:01.000Z",
    closesAt: "2022-12-19T23:59:59.000Z",
    createdAt: "2022-12-19T23:03:44.662Z",
    updatedAt: "2022-12-19T23:03:44.662Z",
    organizationId: "71195bc5-d2b9-4f3e-8932-dd674374ffc6",
  },
];

export const useOrganizationsQueries = () => {
  const useGetOrganization = (id: string) =>
    useQuery({
      queryFn: () => organizationsApi.getOne(id),
      queryKey: organizationsKeys.item(id),
    });

  const useGetServices = (organizationId: string) =>
    useQuery({
      queryKey: organizationsKeys.services(organizationId),
      queryFn: () =>
        new Promise<Service[]>((resolve) =>
          setTimeout(() => resolve(services), 1000)
        ),
    });

  return { useGetOrganization, useGetServices };
};

export const organizationsKeys = {
  all: ["organizations"],
  list: () => [...organizationsKeys.all, "list"],
  items: () => [...organizationsKeys.all, "item"],
  item: (id: string) => [...organizationsKeys.items(), id],
  services: (id: string) => [...organizationsKeys.item(id), "services"],
};
