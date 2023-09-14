export type ServiceBase = {
  name: string;
  subscriptionToken: string;
  guestEnroll: boolean;
  organizationId: string;
  isOpened: boolean;
  opensAt: string;
  closesAt: string;
};

export type Service = ServiceBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
