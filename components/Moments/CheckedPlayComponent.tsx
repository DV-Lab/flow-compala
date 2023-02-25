import { CustomCheckBox } from "@components/CustomCheckbox";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { DEFAULT_NUMBER_OF_COMPARED_MOMENTS } from "@configs/app";
import { useCompareListStore } from "@states/app";
import { PlayComponent } from "./PlayComponent";

export const CheckedPlayComponent: IComponent<{
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
          {playsList.map((play, index) => {
            return (
              <div
                key={index}
                className="flex items-center cursor-auto"
                onClick={() => handleCheck(play.playId)}
              >
                <PlayComponent {...play} translate className="grow" />
                <CustomCheckBox id={play.playId} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="!w-full flex items-center justify-center">
          <LoadingSVG width={48} height={48} className="fill-teal-600" />
        </div>
      )}
    </div>
  );
};
