export const queuesKeys = {
  all: ["queues"],
  items: () => [...queuesKeys.all, "item"],
  item: (queueId: string) => [...queuesKeys.items(), queueId],
};

export const organizationsKeys = {
  item: (organizationId: string) => ["organization", organizationId],
};

export const servicesKeys = {
  all: ["services"],
  list: (id: string) => [...organizationsKeys.item(id), "services"],
  position: (serviceId: string, registrationId: string) => [
    ...servicesKeys.all,
    serviceId,
    "registrationId",
    registrationId,
  ],
};

