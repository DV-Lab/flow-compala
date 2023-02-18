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

export { useAppStore };
