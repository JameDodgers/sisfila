import { Queue, QueueBase } from "../../models/Queue";
import api from "./config";

interface CreateQueueParams extends QueueBase {}

interface CreateQueueResponse extends Queue {}

interface AttachGroupsToQueueParams {
  queueId: string;
  organizationId: string;
  groups: string[];
}

interface GetOneResponse extends Array<Queue> {}

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

export default {
  getOne,
  getQueue,
  create,
  attachGroupsToQueue,
};
