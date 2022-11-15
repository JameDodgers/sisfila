export type UserRoleOnOrganization = {
  organizationName: string;
  organizationId: string;
  role: string;
};

export type User = {
  id: string;
  email: string;
  token: string;
  userRolesOnOrganizationsMap: UserRoleOnOrganization[];
};
