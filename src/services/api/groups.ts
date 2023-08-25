import { Client } from "../../models/Client";
import { Group, GroupBase } from "../../models/Group";
import api from "./config";

interface getOrganizationGroupsResponse extends Array<Group> {
  clients: Client[];
}

interface CreateGroupParams extends GroupBase {}

interface CreateGroupResponse {
  id: string;
}

type ImportedClient = {
  name: string;
  organizationId: string;
  registrationId: string;
};

interface ImportClientsParams {
  clients: ImportedClient[];
  groupId: string;
  organizationId: string;
}

const getOrganizationGroups = (organizationId: string) =>
  api.get<getOrganizationGroupsResponse>(
    `v1/groups/organizations/${organizationId}`
  );

const create = (data: CreateGroupParams) =>
  api.post<CreateGroupResponse>("v1/groups", data);

const importClients = (data: ImportClientsParams) =>
  api.post("v1/groups/import", data);

export default {
  getOrganizationGroups,
  create,
  importClients,
};
