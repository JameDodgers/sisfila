export enum Role {
  TYPE_COORDINATOR = "TYPE_COORDINATOR",
  TYPE_ATTENDENT = "TYPE_ATTENDENT",
}

type RolesInOrganizations = {
  organizationId: string;
  role: Role;
};

export type User = {
  id: string;
  email: string;
  rolesInOrganizations: RolesInOrganizations[];
  createdAt: Date;
  updatedAt: Date;
  token: string;
};
