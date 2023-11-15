import { Client } from "../../models/Client";
import { Desk } from "../../models/Desk";

import api from "./config";

type CreateParams = {
  name: string;
  servicesIds?: string[];
  organizationId: string;
};

type GetOneResponse = {
  desk: Desk;
  lastClientCalled: Client;
};

const getAll = (organizationId: string) =>
  api
    .get<Desk[]>(`v1/desks/organizations/${organizationId}`)
    .then((response) => response.data);

type GetOneParams = {
  organizationId: string;
  deskId: string;
};

const getOne = ({ organizationId, deskId }: GetOneParams) =>
  api
    .get<GetOneResponse>(`v1/desks/${deskId}/organizations/${organizationId}`)
    .then((response) => response.data);

const createDesk = (data: CreateParams) =>
  api.post<Desk>(`v1/desks`, data).then((response) => response.data);

const deleteDesk = (deskId: string) =>
  api.delete(`v1/desks/${deskId}`).then((response) => response.data);

type UpdateRequestBody = {
  name?: string;
  attendantId?: string | null;
  services?: string[];
};

type UpdateParams = {
  deskId: string;
  data: UpdateRequestBody;
};

const updateDesk = ({ deskId, data }: UpdateParams) =>
  api.patch(`v1/desks/${deskId}`, data).then((response) => response.data);

type CallNextResponse = {
  desk: Desk;
  client: Client;
};

const callNext = (id: string) =>
  api
    .patch<CallNextResponse>(`v1/desks/${id}/next`)
    .then((response) => response.data);

export default {
  getAll,
  getOne,
  createDesk,
  deleteDesk,
  updateDesk,
  callNext,
};
