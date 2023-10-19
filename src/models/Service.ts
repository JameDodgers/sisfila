import { Queue } from "./Queue";

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
  isOpened: boolean;
  queues: Queue[];
  createdAt: string;
  updatedAt: string;
};
