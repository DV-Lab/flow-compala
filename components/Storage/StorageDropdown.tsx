import { PlayComponent } from "@components/Moments/PlayComponent";
import { usePreferredPlaysStorageStore } from "@states/app";
import styles from "./styles.module.scss";

const StorageDropdown: IComponent = () => {
  const { preferredPlays, setPreferredPlays } = usePreferredPlaysStorageStore();
  const handleRemovePlay = (id: string) => {
    const newPreferredPlays = preferredPlays.filter(
      (play) => play.playId !== id
    );
    setPreferredPlays(newPreferredPlays);
  };

  return (
    <div className="cart-dropdown absolute  w-[400px] h-[500px] flex flex-col py-2 rounded-lg border border-white dark:bg-black top-[75px] right-[50px] z-20 items-center overflow-x-hidden">
      <div className="cart-items h-[95%] overflow-x-hidden overflow-y-scroll -translate-x-4">
        {preferredPlays?.length > 0 ? (
          preferredPlays.map((play, index) => (
            <div className={`${styles.play}`} key={index}>
              <PlayComponent key={index} {...play} />
              <div className={`${styles.removeBtn} duration-150`}>
                <button onClick={() => handleRemovePlay(play.playId)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <span className="empty-message text-white h-full">
            Your storage is empty
          </span>
        )}
      </div>
    </div>
  );
};

export default StorageDropdown;
