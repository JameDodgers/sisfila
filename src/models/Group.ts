export type GroupBase = {
  name: string;
  organizationId: string;
};

export type Group = GroupBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
