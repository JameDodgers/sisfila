import { useMutation, useQueryClient } from "@tanstack/react-query";

import usersApi, { AuthResponse } from "../services/api/users";
import { resetAllStores } from "../store/helpers";

import { useAuthStore } from "../store/auth";

export const useUserQueries = () => {
  const queryClient = useQueryClient();

  const onSuccess = (data: AuthResponse) => {
    useAuthStore.setState(data);
  };

  const useAuthenticateUser = () =>
    useMutation({
      mutationFn: usersApi.authenticateUser,
      onSuccess,
    });

  const useCreateUser = () =>
    useMutation({
      mutationFn: usersApi.createUser,
      onSuccess,
    });

  const useAuthenticateWithGoogle = () =>
    useMutation({
      mutationFn: usersApi.authenticateWithGoogle,
      onSuccess,
    });

  const useSetUserRoleInOrganizationById = () =>
    useMutation({
      mutationFn: usersApi.setUserRoleInOrganizationById,
      onSuccess: () => {
        // queryClient.setQueryData(organizationsKeys.organizationsKeys);
      },
    });

  const signOut = () => {
    resetAllStores();
    queryClient.clear();
  };

  return {
    useAuthenticateUser,
    useCreateUser,
    useAuthenticateWithGoogle,
    useSetUserRoleInOrganizationById,
    signOut,
  };
};
