export const queuesKeys = {
  all: ["queues"],
  items: () => [...queuesKeys.all, "item"],
  item: (queueId: string) => [...queuesKeys.items(), queueId],
};

export const organizationsKeys = {
  item: (organizationId: string) => ["organization", organizationId],
};
