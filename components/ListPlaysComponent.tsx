import { DEFAULT_NUMBER_OF_COMPARED_MOMENTS } from "@configs/app";
import { Checkbox } from "@material-tailwind/react";
import { useCompareListStore } from "@states/app";
import { transformTier } from "@utils/tools";
import Image from "next/image";
import { CustomTierLabelComponent } from "./CustomTierLableComponent";
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
          {playsList.map(
            ({ avatar, match, matchSeason, playId, playType, tier }) => (
              <div key={playId} className="flex items-center">
                <div className="play-info grow flex items-center">
                  <div className="wrapper -translate-x-8 translate-y-4 w-[180px] h-[180px]">
                    <Image
                      src={avatar}
                      alt={playId}
                      width="100%"
                      height="100%"
                      layout="responsive"
                    />
                  </div>
                  <div className="-translate-x-12 w-3/4">
                    <CustomTierLabelComponent text={transformTier(tier)} />
                    <h2 className="type text-gray-600 font-medium">
                      {playType} &#9830; {matchSeason}
                    </h2>
                    <h2 className="text-gray-400 font-medium text-base">
                      {match}
                    </h2>
                  </div>
                </div>
                <Checkbox
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onClick={() => handleCheck(playId)}
                  disabled={
                    !(
                      numOfComparedPlays === 0 ||
                      numOfComparedPlays < DEFAULT_NUMBER_OF_COMPARED_MOMENTS
                    ) && !comparedPlays.includes(playId)
                  }
                  checked={comparedPlays.includes(playId)}
                />
              </div>
            )
          )}
        </div>
      ) : (
        <div className="!w-full flex items-center justify-center">
          <LoadingSVG width={48} height={48} className="fill-teal-600" />
        </div>
      )}
    </div>
  );
};
