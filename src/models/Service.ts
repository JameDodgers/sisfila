export type ServiceBase = {
  name: string;
  subscriptionToken: string;
  guestEnrollment: boolean;
  organizationId: string;
  opensAt: Date;
  closesAt: Date;
};

export type Service = ServiceBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
