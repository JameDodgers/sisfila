import { Queue, QueueBase, QueueCommon } from "../../models/Queue";

import api from "./config";

interface GetOneResponse extends Array<Queue> {}

interface CreateQueueParams extends QueueBase {}

interface CreateQueueResponse extends Queue {}

interface UpdateQueueParams extends Partial<QueueCommon> {
  groups?: string[];
  queueId: string;
}

interface RemoveQueueParams {
  queueId: string;
  organizationId: string;
}

const getOne = (organizationId: string) =>
  api.get<GetOneResponse>(`v1/queues/organizations/${organizationId}`);

const getQueue = (queueId: string) => api.get<Queue>(`v1/queues/${queueId}`);

const create = (data: CreateQueueParams) =>
  api
    .post<CreateQueueResponse>("v1/queues", data)
    .then((response) => response.data);

const update = ({ queueId, organizationId, ...data }: UpdateQueueParams) =>
  api
    .patch(`v1/queues/${queueId}/organizations/${organizationId}`, data)
    .then((response) => response.data);

const remove = ({ queueId, organizationId }: RemoveQueueParams) =>
  api.delete(`v1/queues/${queueId}/organizations/${organizationId}`);

export default {
  getOne,
  getQueue,
  create,
  update,
  remove,
};
