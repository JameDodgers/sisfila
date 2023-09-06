import { Client } from "./Client";
import { Group } from "./Group";

export type QueueCommon = {
  name: string;
  description: string;
  code: string;
  priority: number;
  organizationId: string;
  serviceId: string;
};

export type QueueBase = QueueCommon & {
  groups: string[];
};

export type Queue = QueueCommon & {
  id: string;
  createdAt: string;
  updatedAt: string;
  clients: Client[];
  groups: Group[];
  lastClientCalled: Client | null;
};
