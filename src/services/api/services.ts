import { Service } from "../../models/Service";
import api from "./config";

interface GetOneResponse extends Array<Service> {}

const getAllFromOrganization = (organizationId: string) =>
  api
    .get<GetOneResponse>(`v1/services/organizations/${organizationId}`)
    .then((response) => response.data);

interface EnterServiceRequestBody {
  registrationId: string;
  organizationId: string;
  serviceId: string;
}

interface EnterServiceResponse {
  queueId: string;
  queueName: string;
  position: Number;
}

const enter = (data: EnterServiceRequestBody) =>
  api
    .patch<EnterServiceResponse>("v1/services/enter", data)
    .then((response) => response.data);

export default { getAllFromOrganization, enter };
