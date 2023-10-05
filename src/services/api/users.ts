import { Role, User } from "../../models/User";
import api from "./config";

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

interface CreateUserRequest extends AuthenticateUserRequest {
  name: string;
}
interface AuthenticateWithGoogleRequest {
  oauthToken: string;
  audience: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

interface AuthenticateUserResponse extends AuthResponse {}

interface CreateUserResponse extends AuthResponse {}

interface AuthenticateWithGoogleResponse extends AuthResponse {}

const authenticateUser = (data: AuthenticateUserRequest) =>
  api
    .post<AuthenticateUserResponse>("/v1/users/auth", data)
    .then((response) => response.data);

const createUser = (data: CreateUserRequest) =>
  api
    .post<CreateUserResponse>("/v1/users", data)
    .then((response) => response.data);

const authenticateWithGoogle = (data: AuthenticateWithGoogleRequest) =>
  api
    .post<AuthenticateWithGoogleResponse>("/v1/users/auth/google", data)
    .then((response) => response.data);

interface SetUserRoleInOrganizationByIdRequest {
  userId: string;
  organizationId: string;
  role: Role;
}

interface SetUserRoleInOrganizationByEmailParams {
  userEmail: string;
  organizationId: string;
  role: Role;
}

type GetAllFromOrganizationResponse = User[];

type GetOneParms = {
  userId: string;
  organizationId: string;
};

type RemoveUserFromOrganizationByIdParams = {
  userId: string;
  organizationId: string;
};

const getAllFromOrganization = (organizationId: string) =>
  api
    .get<GetAllFromOrganizationResponse>(
      `v1/users/organizations/${organizationId}`
    )
    .then((response) => response.data);

const getOne = ({ userId, organizationId }: GetOneParms) =>
  api
    .get<User>(`v1/users/${userId}/organizations/${organizationId}`)
    .then((response) => response.data);

const setUserRoleInOrganizationById = ({
  userId,
  organizationId,
  ...data
}: SetUserRoleInOrganizationByIdRequest) =>
  api
    .patch<User>(`v1/users/${userId}/organizations/${organizationId}`, data)
    .then((response) => response.data);

const setUserRoleInOrganizationByEmail = ({
  userEmail,
  organizationId,
  ...data
}: SetUserRoleInOrganizationByEmailParams) =>
  api
    .patch(`v1/users/email/${userEmail}/organizations/${organizationId}`, data)
    .then((response) => response.data);

const removeUserFromOrganizationById = ({
  userId,
  organizationId,
}: RemoveUserFromOrganizationByIdParams) =>
  api.delete(`v1/users/${userId}/organizations/${organizationId}`);

export default {
  authenticateUser,
  createUser,
  authenticateWithGoogle,
  getOne,
  getAllFromOrganization,
  setUserRoleInOrganizationById,
  setUserRoleInOrganizationByEmail,
  removeUserFromOrganizationById,
};
