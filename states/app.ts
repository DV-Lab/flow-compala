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

interface IPreferredPlaysStorageState {
  hidden: boolean;
  preferredPlays: IPlay[];
  setHidden: () => void;
  setPreferredPlays: (list: IPlay[]) => void;
}

const usePreferredPlaysStorageStore = create<IPreferredPlaysStorageState>(
  (set, get) => ({
    hidden: true,
    preferredPlays: [],
    setHidden: () => {
      set({ hidden: !get().hidden });
    },
    setPreferredPlays: (list) => {
      set({ preferredPlays: list });
    },
  })
);

export { useAppStore, useCompareListStore, usePreferredPlaysStorageStore };
