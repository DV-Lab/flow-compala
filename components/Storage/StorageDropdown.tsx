import { usePreferredPlaysStorageStore } from "@states/app";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

import { PlayComponent } from "@components/PlayComponent";
import { TransitionLayout } from "@layouts/TransitionLayout";

const StorageDropdown: IComponent = () => {
  const { preferredPlays, setHidden } = usePreferredPlaysStorageStore();
  const router = useRouter();
  const handleClick = () => {
    setHidden();
    router.push("/checkout");
  };

  return (
    <div className="cart-dropdown absolute  w-[350px] h-[450px] flex flex-col p-[20px] rounded-lg border border-white dark:bg-black top-[75px] right-[50px] z-20 items-center">
      <div className="cart-items h-[80%] overflow-scroll">
        {preferredPlays?.length > 0 ? (
          preferredPlays.map((play, index) => (
            <PlayComponent key={index} {...play} />
          ))
        ) : (
          <span className="empty-message text-white h-full">
            Your storage is empty
          </span>
        )}
      </div>
      <button className={styles.goToStorage} onClick={handleClick}>
        GO TO STORAGE
      </button>
    </div>
  );
};

export default StorageDropdown;
