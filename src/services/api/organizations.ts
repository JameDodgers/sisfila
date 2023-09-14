import { Organization } from "../../models/Organization";
import api from "./config";

interface GetOneResponse extends Organization {}

interface GetAllResponse extends Array<Organization> {}

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
    .get<GetOneResponse>(`v1/organizations/${id}`)
    .then((response) => response.data);

const getAll = () =>
  api.get<GetAllResponse>(`v1/organizations`).then((response) => response.data);

const create = (data: CreateRequest) =>
  api
    .post<Organization>("v1/organizations", data)
    .then((response) => response.data);

const update = (data: UpdateRequest) =>
  api.post("v1/organizations", data).then((response) => response.data);

const remove = (id: string) =>
  api.delete(`v1/organizations/${id}`).then((response) => response.data);

export default {
  getOne,
  getAll,
  create,
  update,
  remove,
};
