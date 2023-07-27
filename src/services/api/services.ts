import { Service, ServiceBase } from "../../models/Service";
import api from "./config";

interface GetOneResponse extends Array<Service> {}

interface CreateServiceParams extends ServiceBase {}

interface CreateServiceResponse {
  id: string;
}

const getOne = (organizationId: string) =>
  api.get<GetOneResponse>(`v1/services/organizations/${organizationId}`);

const create = (data: CreateServiceParams) =>
  api.post<CreateServiceResponse>("v1/services", data);

export default { getOne, create };
