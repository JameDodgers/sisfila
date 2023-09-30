import { Client } from "./Client";
import { Group } from "./Group";

export type QueueCommon = {
  name: string;
  description: string;
  code: string;
  organizationId: string;
  serviceId: string;
};

export type QueueBase = QueueCommon & {
  groupIds: string[];
};

export type Queue = QueueCommon & {
  id: string;
  createdAt: string;
  updatedAt: string;
  clients: Client[];
  groups: Group[];
  lastClientCalled: Client | null;
};
