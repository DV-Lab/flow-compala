import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

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

const useCompareListStore = create<ICompareListState>()(
  devtools(
    persist(
      (set, get) => ({
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
      }),
      {
        name: "Compare-List-Storage",
      }
    )
  )
);

interface IPreferredPlaysStorageState {
  hidden: boolean;
  preferredPlays: IPlay[];
  setHidden: () => void;
  setPreferredPlays: (list: IPlay[]) => void;
}

const usePreferredPlaysStorageStore = create<IPreferredPlaysStorageState>()(
  devtools(
    persist(
      (set, get) => ({
        hidden: true,
        preferredPlays: [],
        setHidden: () => {
          set({ hidden: !get().hidden });
        },
        setPreferredPlays: (list) => {
          set({ preferredPlays: list });
        },
      }),
      {
        name: "Preferred-Plays-Storage",
      }
    )
  )
);

export { useAppStore, useCompareListStore, usePreferredPlaysStorageStore };
