import create from "zustand";

interface IAppState {
  darkMode: TDarkModeStatus;
  setDarkMode: (mode: TDarkModeStatus) => void;
}

const useAppStore = create<IAppState>((set) => ({
  darkMode: "dark",
  setDarkMode: (mode) => {
    set({ darkMode: mode });
  },
}));

interface ICompareListState {
  playIds: string[];
  count: number;
  setPlayIds: (players: string[]) => void;
  setIncreaseCount: () => void;
  setDecreaseCount: () => void;
}

const useCompareListStore = create<ICompareListState>((set, get) => ({
  playIds: [],
  count: 0,
  setPlayIds: (playIds: string[]) => {
    set({ playIds });
  },
  setIncreaseCount: () => {
    set({ count: get().count + 1 });
  },
  setDecreaseCount: () => {
    set({ count: get().count - 1 });
  },
}));

export { useAppStore, useCompareListStore };
