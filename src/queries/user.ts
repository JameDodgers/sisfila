import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setToken } from "../store/tokens";
import * as usersApi from "../services/users";
import { resetAllStores } from "../store/helpers";
import { User } from "../models/User";

export const useUserQueries = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<User>(["user"]);

  const onSuccess = (data: usersApi.AuthResponse) => {
    queryClient.setQueryData(["user"], data.user);

    setToken(data.token);
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

  const signOut = () => {
    resetAllStores();
    queryClient.clear();
  };

  return {
    user,
    useAuthenticateUser,
    useCreateUser,
    useAuthenticateWithGoogle,
    signOut,
  };
};
