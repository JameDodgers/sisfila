import { Client } from "../../models/Client";
import { Group, GroupBase } from "../../models/Group";
import api from "./config";

interface getOrganizationGroupsResponse extends Array<Group> {
  clients: Client[];
}

interface CreateGroupParams extends GroupBase {}

interface UpdateGroupParams extends GroupBase {
  groupId: string;
}

type ImportedClient = {
  name: string;
  registrationId: string;
};

interface ImportClientsParams {
  clients: ImportedClient[];
  groupId: string;
  organizationId: string;
}

interface RemoveGroupParams {
  groupId: string;
  organizationId: string;
}

const getAllFromOrganization = (organizationId: string) =>
  api
    .get<getOrganizationGroupsResponse>(
      `v1/groups/organizations/${organizationId}`
    )
    .then((response) => response.data);

const create = (data: CreateGroupParams) =>
  api.post<Group>("v1/groups", data).then((response) => response.data);

const update = ({ groupId, organizationId, ...data }: UpdateGroupParams) =>
  api
    .patch<Group>(`v1/groups/${groupId}/organizations/${organizationId}`, data)
    .then((response) => response.data);

const importClients = (data: ImportClientsParams) =>
  api.post("v1/groups/import", data);

const remove = ({ groupId, organizationId }: RemoveGroupParams) =>
  api.delete(`v1/groups/${groupId}/organizations/${organizationId}`);

export default {
  getAllFromOrganization,
  create,
  update,
  importClients,
  remove,
};
