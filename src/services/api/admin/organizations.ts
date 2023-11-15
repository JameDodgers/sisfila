import { PrivateOrganization } from "../../../models/Organization";
import api from "../config";

interface CreateRequest {
  name: string;
  code: string;
}

interface UpdateRequest {
  id: string;
  name: string;
  code: string;
}

const getOne = (id: string) =>
  api
    .get<PrivateOrganization>(`v1/admin/organizations/${id}`)
    .then((response) => response.data);

const getAll = () =>
  api
    .get<PrivateOrganization[]>(`v1/admin/organizations`)
    .then((response) => response.data);

const create = (data: CreateRequest) =>
  api
    .post<PrivateOrganization>("v1/admin/organizations", data)
    .then((response) => response.data);

const update = (data: UpdateRequest) =>
  api.patch("v1/admin/organizations", data).then((response) => response.data);

const remove = (id: string) =>
  api.delete(`v1/admin/organizations/${id}`).then((response) => response.data);

export default {
  getOne,
  getAll,
  create,
  update,
  remove,
};
