import { Client } from "../../models/Client";

import api from "./config";

interface GetOrganizationClientsResponse extends Array<Client> {}

interface RemoveClientsParams {
  clientId: string;
  organizationId: string;
}

const getOrganizationClients = (organizationId: string) =>
  api
    .get<GetOrganizationClientsResponse>(
      `v1/clients/organizations/${organizationId}`
    )
    .then((response) => response.data);

const remove = ({ clientId, organizationId }: RemoveClientsParams) =>
  api
    .delete(`v1/clients/${clientId}/organizations/${organizationId}`)
    .then((response) => response.data);

export default {
  getOrganizationClients,
  remove,
};
