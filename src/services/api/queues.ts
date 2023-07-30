import { Client } from "../../models/Client";
import { Group } from "../../models/Group";
import { Queue } from "../../models/Queue";
import api from "./config";

interface CreateQueueParams {
  name: string;
  description: string;
  priority: number;
  code: string;
  organizationId: string;
  serviceId: string;
}

interface CreateQueueResponse {
  id: string;
}

interface AttachGroupsToQueueParams {
  queueId: string;
  organizationId: string;
  groups: Group[];
}

interface GetOneResponse extends Array<Queue> {}

interface EnterQueueParams {
  registrationId: string;
  organizationId: string;
  queueId: string;
}

const getOne = (organizationId: string) =>
  api.get<GetOneResponse>(`v1/queues/organizations/${organizationId}`);

const getQueue = (queueId: string) => api.get<Queue>(`v1/queues/${queueId}`);

const create = (data: CreateQueueParams) =>
  api.post<CreateQueueResponse>("v1/queues", data);

const attachGroupsToQueue = ({
  queueId,
  organizationId,
  ...data
}: AttachGroupsToQueueParams) =>
  api.patch(`v1/queues/${queueId}/organizations/${organizationId}`, data);

const enter = (data: EnterQueueParams) =>
  api.patch<CreateQueueResponse>("v1/queues/enter", data);

export default {
  getOne,
  getQueue,
  create,
  attachGroupsToQueue,
  enter,
};
