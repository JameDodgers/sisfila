import { Queue, QueueBase } from "../../models/Queue";
import api from "./config";

interface CreateQueueParams extends QueueBase {}

interface CreateQueueResponse {
  id: string;
}

interface AttachGroupsToQueueParams {
  queueId: string;
  organizationId: string;
  groups: string[];
}

interface GetOneResponse extends Array<Queue> {}

interface EnterQueueParams {
  registrationId: string;
  organizationId: string;
  queueId: string;
}

interface CallNextParams {
  organizationId: string;
  queueId: string;
}

const getOne = (organizationId: string) =>
  api.get<GetOneResponse>(`v1/queues/organizations/${organizationId}`);

const getQueue = (queueId: string) => api.get<Queue>(`v1/queues/${queueId}`);

const create = (data: CreateQueueParams) =>
  api
    .post<CreateQueueResponse>("v1/queues", data)
    .then((response) => response.data);

const attachGroupsToQueue = ({
  queueId,
  organizationId,
  ...data
}: AttachGroupsToQueueParams) =>
  api.patch(`v1/queues/${queueId}/organizations/${organizationId}`, data);

const enter = (data: EnterQueueParams) =>
  api.patch<CreateQueueResponse>("v1/queues/enter", data);

const callNext = (data: CallNextParams) => api.patch("v1/queues/next", data);

export default {
  getOne,
  getQueue,
  create,
  callNext,
  attachGroupsToQueue,
  enter,
};
