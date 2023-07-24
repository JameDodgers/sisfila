import { Organization } from "../models/Organization";
import api from "./api";

const getOne = (id: string) =>
  api
    .get<Organization>(`v1/organizations/${id}`)
    .then((response) => response.data);

export default {
  getOne,
};
