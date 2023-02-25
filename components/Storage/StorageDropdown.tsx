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
    <div className="cart-dropdown absolute w-[400px] h-[500px] flex flex-col py-2 rounded-lg border border-white dark:bg-black top-[75px] right-[50px] z-20 items-center overflow-x-hidden ">
      {preferredPlays?.length > 0 ? (
        <div className="grow flex flex-col pb-2">
          <div className="-translate-x-4 cart-items p-6 overflow-x-hidden overflow-y-scroll grow">
            {preferredPlays.map((play, index) => (
              <div className={`${styles.play}`} key={index}>
                <PlayComponent key={index} {...play} />
                <div className={`${styles.removeBtn} duration-150`}>
                  <button onClick={() => handleRemovePlay(play.playId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full justify-center -translate-y-2">
            <button className={`${styles.checkoutBtn} duration-200`}>
              Go to checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-message text-2xl text-white h-full flex items-center translate-x-1 z-30">
          Favorite plays are empty
        </div>
      )}
    </div>
  );
};

export default StorageDropdown;
