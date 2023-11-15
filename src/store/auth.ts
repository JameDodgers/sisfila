import { persist, createJSONStorage } from "zustand/middleware";

import Storage from "../libs/storage";
import { User } from "../models/User";

import { create } from "./helpers";

export interface Auth {
  user?: User;
  token?: string;
  fcmToken?: string;
}

export const useAuthStore = create<Auth>()(
  persist(
    () =>
      ({
        token: undefined,
        user: undefined,
        fcmToken: undefined,
      } as Auth),
    {
      name: "tokens",
      storage: createJSONStorage(() => Storage),
    }
  )
);

export const useToken = () => useAuthStore((state) => state.token);

export const useUser = () => useAuthStore((state) => state.user);
