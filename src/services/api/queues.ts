import { Group } from "../../models/Group";
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

const getOne = (organizationId: string) =>
  api.get(`v1/queues/organizations/${organizationId}`);

const getQueue = (queueId: string) => api.get(`v1/queues/${queueId}`);

const create = (data: CreateQueueParams) =>
  api.post<CreateQueueResponse>("v1/create", data);

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
