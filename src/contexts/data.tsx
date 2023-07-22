import React, { ReactNode } from "react";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const queryClient = new QueryClient();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

interface DataProviderProps {
  children: ReactNode;
}

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
