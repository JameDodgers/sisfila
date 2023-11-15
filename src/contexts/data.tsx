import React, { ReactNode } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { isAxiosError } from "axios";

import { useMessageStore } from "../store/message";

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

interface DataProviderProps {
  children: ReactNode;
}

const handleError = (error: unknown) => {
  const message =
    (isAxiosError(error) && error.response?.data.message) || "Ocorreu um erro";

  useMessageStore.getState().show(message);
};

const queryCache = new QueryCache({
  onError: (error, query) => {
    if (query.meta?.shouldBeHandledByGlobalErrorHandler) {
      handleError(error);
    }
  },
});

const mutationCache = new MutationCache({
  onError: (error, _variables, _context, mutation) => {
    if (
      !mutation.options.onError ||
      mutation.meta?.shouldBeHandledByGlobalErrorHandler
    ) {
      handleError(error);
    }
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) =>
        isAxiosError(error) && error.response?.status
          ? error.response?.status >= 500 && failureCount <= 3
          : false,
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
