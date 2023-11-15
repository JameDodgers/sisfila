import { Desk } from "../../models/Desk";
import { Service } from "../../models/Service";

import api from "./config";

interface GetOneResponse extends Array<Service> {}

export interface GetClientPositionInServiceParams {
  serviceId: string;
  registrationId: string;
}

export interface GetClientPositionInServiceResponse {
  position: number;
  desk?: Desk;
}

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
  position: number;
}

const enter = (data: EnterServiceRequestBody) =>
  api
    .patch<EnterServiceResponse>("v1/services/enter", data)
    .then((response) => response.data);

const getClientPositionInService = ({
  serviceId,
  registrationId,
}: GetClientPositionInServiceParams) =>
  api
    .get<GetClientPositionInServiceResponse>(
      `v1/services/${serviceId}/position/${registrationId}`
    )
    .then((response) => response.data);

export default { getAllFromOrganization, enter, getClientPositionInService };
