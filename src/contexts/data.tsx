import React, { ReactNode } from "react";

import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMessageStore } from "../store/message";

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

interface DataProviderProps {
  children: ReactNode;
}

const queryCache = new QueryCache({
  onError: (error, query) => {
    useMessageStore
      .getState()
      .show(error.response?.data.message || "Ocorreu um erro");
  },
});

const mutationCache = new MutationCache({
  onError: (error, _variables, _context, _mutation) => {
    useMessageStore
      .getState()
      .show(error.response?.data.message || "Ocorreu um erro");
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) =>
        error.response?.status >= 500 && failureCount <= 3,
    },
  },
  queryCache,
  mutationCache,
});

export const DataProvider = ({ children }: DataProviderProps) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister, maxAge: Infinity }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
