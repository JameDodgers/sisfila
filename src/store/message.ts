import { create } from "zustand";

export interface State {
  visible: boolean;
  message?: string;
  show: (message: string) => void;
  dismiss: () => void;
}

export const useMessageStore = create<State>((set) => ({
  visible: false,
  message: undefined,
  show: (message) => set({ message, visible: true }),
  dismiss: () => set({ visible: false }),
}));
