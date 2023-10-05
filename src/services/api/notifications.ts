import api from "./config";

type AddTokenToClientParams = {
  registrationId: string;
  organizationId: string;
  token: string;
};

const addTokenToClient = ({
  registrationId,
  organizationId,
  ...data
}: AddTokenToClientParams) =>
  api.patch(
    `v1/clients/notification/${registrationId}/organizations/${organizationId}`,
    data
  );

type SubscribeToQueueRequestBody = {
  token: string;
  queueId: string;
};

type UnSubscribeToQueueRequestBody = SubscribeToQueueRequestBody;

const subscribeToQueue = (data: SubscribeToQueueRequestBody) =>
  api.patch(`v1/clients/notification/subscribe`, data);

const unSubscribeFromQueue = (data: UnSubscribeToQueueRequestBody) =>
  api.patch(`v1/clients/notification/unsubscribe`, data);

export default {
  addTokenToClient,
  subscribeToQueue,
  unSubscribeFromQueue,
};
