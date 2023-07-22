import { persist, createJSONStorage } from "zustand/middleware";

import Storage from "../libs/storage";
import { create } from "./helpers";

interface TokensState {
  token?: string;
}

export const useTokensStore = create<TokensState>()(
  persist(
    () =>
      ({
        token: undefined,
      } as TokensState),
    {
      name: "tokens",
      storage: createJSONStorage(() => Storage),
    }
  )
);

export const useToken = () => useTokensStore((state) => state.token);

export const setToken = (token: string) => useTokensStore.setState({ token });
