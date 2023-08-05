import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

import { create } from "./helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator } from "zustand";

export interface OrganizerStore {
  currentOrganizationId?: string;
}

type MyPersist = (
  config: StateCreator<OrganizerStore>,
  options: PersistOptions<OrganizerStore>
) => StateCreator<OrganizerStore>;

export const useOrganizerStore = create<OrganizerStore>()(
  (persist as MyPersist)(
    () => ({
      currentOrganizationId: undefined,
    }),
    {
      name: "organizer",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const setCurrentOrganizationId = (currentOrganizationId: string) =>
  useOrganizerStore.setState({ currentOrganizationId });
