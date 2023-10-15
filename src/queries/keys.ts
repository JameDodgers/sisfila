export const organizationsKeys = {
  all: ["organizations"],
  list: () => [...organizationsKeys.all, "list"],
  items: () => [...organizationsKeys.all, "item"],
  item: (id: string) => [...organizationsKeys.items(), id],
};

export const clientsKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "clients"],
};

export const groupsKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "groups"],
};

export const servicesKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "services"],
};

export const attendantsKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "attendants"],
};

export const desksKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "desks"],
  list: (id: string) => [...desksKeys.all(id), "list"],
  items: (id: string) => [...desksKeys.all(id), "item"],
  item: (organizationId: string, queueId: string) => [
    ...desksKeys.items(organizationId),
    queueId,
  ],
  client: (organizationId: string, deskId: string) => [
    ...desksKeys.item(organizationId, deskId),
    "client",
  ],
};

export const queuesKeys = {
  all: (id: string) => [...organizationsKeys.item(id), "queues"],
  list: (id: string) => [...queuesKeys.all(id), "list"],
  items: (id: string) => [...queuesKeys.all(id), "item"],
  item: (organizationId: string, queueId: string) => [
    ...queuesKeys.items(organizationId),
    queueId,
  ],
};
