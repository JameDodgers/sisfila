export type ServiceBase = {
  name: string;
  subscriptionToken: string;
  organizationId: string;
  opensAt: string;
  closesAt: string;
};

export type Service = ServiceBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
