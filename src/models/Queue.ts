import { Client } from "./Client";

export type Queue = {
  id: string;
  name: string;
  description: string;
  code: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  serviceId: string;
  clients: Client[];
  lastClientCalled: Client;
};
