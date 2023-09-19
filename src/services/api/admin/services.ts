import { Service, ServiceBase } from "../../../models/Service";
import api from "../config";

interface CreateServiceParams extends ServiceBase {}

const getAllFromOrganization = (organizationId: string) =>
  api
    .get<Service[]>(`v1/admin/services/organizations/${organizationId}`)
    .then((response) => response.data);

const create = (data: CreateServiceParams) =>
  api
    .post<Service>("v1/admin/services", data)
    .then((response) => response.data);

export default { getAllFromOrganization, create };
