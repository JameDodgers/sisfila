import { Client } from "./Client";

export type QueueBase = {
  name: string;
  description: string;
  code: string;
  priority: number;
  organizationId: string;
  serviceId: string;
};

export type Queue = QueueBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
  clients: Client[];
  lastClientCalled: Client | null;
};
