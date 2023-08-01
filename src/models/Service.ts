export type ServiceBase = {
  name: string;
  subscriptionToken: string;
  guestEnrollment: boolean;
  organizationId: string;
  opensAt: string;
  closesAt: string;
};

export type Service = ServiceBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
