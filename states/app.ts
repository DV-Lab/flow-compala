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
  comparedPlays: string[];
  numOfComparedPlays: number;
  setComparedPlays: (playIds: string[]) => void;
  setIncreaseNumOfComparedPlays: () => void;
  setDecreaseNumOfComparedPlays: () => void;
}

const useCompareListStore = create<ICompareListState>((set, get) => ({
  comparedPlays: [],
  numOfComparedPlays: 0,
  setComparedPlays: (playIds: string[]) => {
    set({ comparedPlays: playIds });
  },
  setIncreaseNumOfComparedPlays: () => {
    set({ numOfComparedPlays: get().numOfComparedPlays + 1 });
  },
  setDecreaseNumOfComparedPlays: () => {
    set({ numOfComparedPlays: get().numOfComparedPlays - 1 });
  },
}));

export { useAppStore, useCompareListStore };
