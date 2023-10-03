import { Service, ServiceBase } from "../../../models/Service";
import api from "../config";

interface CreateServiceParams extends ServiceBase {}

interface UpdateServiceParams
  extends Partial<Omit<ServiceBase, "organizationId">> {
  queueIds: string[];
  serviceId: string;
}

const getAllFromOrganization = (organizationId: string) =>
  api
    .get<Service[]>(`v1/admin/services/organizations/${organizationId}`)
    .then((response) => response.data);

const create = (data: CreateServiceParams) =>
  api
    .post<Service>("v1/admin/services", data)
    .then((response) => response.data);

const update = ({ serviceId, ...data }: UpdateServiceParams) =>
  api
    .patch<Service>(`v1/admin/services/${serviceId}`, data)
    .then((response) => response.data);

const remove = (serviceId: string) =>
  api.delete(`v1/admin/services/${serviceId}`);

export default {
  getAllFromOrganization,
  create,
  update,
  remove,
};
