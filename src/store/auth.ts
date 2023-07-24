import { persist, createJSONStorage } from "zustand/middleware";

import Storage from "../libs/storage";
import { create } from "./helpers";
import { User } from "../models/User";

export interface Auth {
  user?: User;
  token?: string;
}

export const useAuthStore = create<Auth>()(
  persist(
    () =>
      ({
        token: undefined,
        user: undefined,
      } as Auth),
    {
      name: "tokens",
      storage: createJSONStorage(() => Storage),
    }
  )
);

export const useToken = () => useAuthStore((state) => state.token);

export const useUser = () => useAuthStore((state) => state.user);
