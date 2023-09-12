import { Service } from "./Service";

export type Desk = {
  id: string;
  name: string;
  organizationId: string;
  attendantId: string | null;
  services: Service[];
  createdAt: string;
  updatedAt: string;
};
