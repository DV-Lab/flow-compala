import { transformTier } from "@utils/tools";
import Image from "next/image";
import { CustomizedTierLabelComponent } from "./CustomizedTierLabelComponent";

interface IPlayComponentProps extends IPlay {
  translate?: boolean;
  className?: string;
}
export const PlayComponent: IComponent<IPlayComponentProps> = ({
  avatar,
  match,
  matchSeason,
  playId,
  playType,
  tier,
  translate,
  className,
}) => {
  return (
    <div key={playId} className={`flex items-center ${className}`}>
      <div className="play-info grow flex items-center">
        <div
          className={`wrapper w-[180px] h-[180px] ${
            translate ? "-translate-x-8 translate-y-4" : ""
          }`}
        >
          <Image
            src={avatar}
            alt={playId}
            width="100%"
            height="100%"
            layout="responsive"
          />
        </div>
        <div className={`${translate ? "-translate-x-12 w-3/4" : ""}`}>
          <CustomizedTierLabelComponent text={transformTier(tier)} />
          <h2 className="type text-gray-600 font-medium">
            {playType} &#9830; {matchSeason}
          </h2>
          <h2 className="text-gray-400 font-medium text-base">{match}</h2>
        </div>
      </div>
    </div>
  );
};
