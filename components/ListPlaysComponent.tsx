import { DEFAULT_NUMBER_OF_COMPARED_MOMENTS } from "@configs/app";
import { Checkbox } from "@material-tailwind/react";
import { useCompareListStore } from "@states/app";
import { transformTier } from "@utils/tools";
import Image from "next/image";
import { CustomTierLabelComponent } from "./CustomTierLableComponent";
import { PlayComponent } from "./PlayComponent";
import { LoadingSVG } from "./SVGIcons/LoadingSVG";

export const ListPlaysComponent: IComponent<{
  playsList: IPlay[];
}> = ({ playsList }) => {
  const {
    comparedPlays,
    numOfComparedPlays,
    setComparedPlays,
    setDecreaseNumOfComparedPlays,
    setIncreaseNumOfComparedPlays,
  } = useCompareListStore();

  const handleCheck = (id: string) => {
    if (playsList) {
      if (comparedPlays.includes(id)) {
        const newPlayIds = comparedPlays.filter((play) => play !== id);
        setComparedPlays(newPlayIds);
        setDecreaseNumOfComparedPlays();
        return;
      }
      if (numOfComparedPlays < DEFAULT_NUMBER_OF_COMPARED_MOMENTS) {
        const newPlayers = [...comparedPlays, id];
        setComparedPlays(newPlayers);
        setIncreaseNumOfComparedPlays();
      }
      return;
    }
  };

  return (
    <div>
      {playsList.length > 0 ? (
        <div>
          {playsList.map((play, index) => (
            <div key={index} className="flex items-center">
              <PlayComponent {...play} translate />
              <Checkbox
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onClick={() => handleCheck(play.playId)}
                disabled={
                  !(
                    numOfComparedPlays === 0 ||
                    numOfComparedPlays < DEFAULT_NUMBER_OF_COMPARED_MOMENTS
                  ) && !comparedPlays.includes(play.playId)
                }
                checked={comparedPlays.includes(play.playId)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="!w-full flex items-center justify-center">
          <LoadingSVG width={48} height={48} className="fill-teal-600" />
        </div>
      )}
    </div>
  );
};
