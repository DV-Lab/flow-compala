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
  players: IPlayerInfo[];
  count: number;
  setPlayers: (players: IPlayerInfo[]) => void;
  setIncreaseCount: () => void;
  setDecreaseCount: () => void;
}

const useCompareListStore = create<ICompareListState>((set, get) => ({
  players: [],
  count: 0,
  setPlayers: (players: IPlayerInfo[]) => {
    set({ players });
  },
  setIncreaseCount: () => {
    set({ count: get().count + 1 });
  },
  setDecreaseCount: () => {
    set({ count: get().count - 1 });
  },
}));

export { useAppStore, useCompareListStore };
