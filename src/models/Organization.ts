import { Role } from "./User";

export type Organization = {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PrivateOrganization = {
  userRoleInOrganization: Role;
} & Organization;
