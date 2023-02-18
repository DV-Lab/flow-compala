import { useAppStore } from "@states/app";
import { cx } from "@utils/tools";

import styles from "./styles.module.scss";

const DarkModeButton: IComponent = () => {
  const { darkMode, setDarkMode } = useAppStore();

  return (
    <div
      className={`${styles.toggleThemeWrapper} active:scale-75 ease-in-out duration-500 p-2 m-6 absolute top-0 right-0 cursor-pointer z-30`}
    >
      <label className={styles.toggleTheme} htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onClick={() => setDarkMode(darkMode === "dark" ? "light" : "dark")}
        />
        <div
          className={`${
            darkMode === "dark" ? cx(styles.dark, "!bg-[#8796A5]") : ""
          } ${styles.slider} `}
        ></div>
      </label>
    </div>
  );
};

export default DarkModeButton;
