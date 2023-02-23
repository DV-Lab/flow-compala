import { useCompareListStore } from "@states/app";
import { cx, transformTier } from "@utils/tools";
import { TIER_TYPE } from "constant/tier";
import Image from "next/image";
import { useCallback } from "react";
import { CloseButtonSVG } from "./SVGIcons/CloseButtonSVG";

export const CompareItem: IComponent<{
  id: string;
  metadata: IPlayMetadata;
  media: IPlayMedia;
  edition: IPlayEdition;
}> = ({ id, metadata, media, edition }) => {
  const { PlayerFirstName, PlayerLastName } = metadata;
  const { tier, numMinted } = edition;
  const { comparedPlays, setComparedPlays, setDecreaseNumOfComparedPlays } =
    useCompareListStore();
  const handleDismiss = (playId: string) => {
    const newPlayIds = comparedPlays.filter((play) => play !== playId);
    setComparedPlays(newPlayIds);
    setDecreaseNumOfComparedPlays();
    return;
  };
  const renderTierStyles = useCallback((tier: string) => {
    switch (tier) {
      case TIER_TYPE.LEGENDARY:
        return "from-indigo-300 via-purple-300 to-pink-700";
      case TIER_TYPE.RARE:
        return "from-white via-yellow-700 to-yellow-900";
      case TIER_TYPE.UNCOMMON:
        return "from-green-50 via-green-300 to-green-600";
      case TIER_TYPE.COMMON:
        return "from-blue-300 via-blue-400 to-blue-500";
      default:
        return "";
    }
  }, []);

  return (
    <div
      className={cx(
        "bg-gradient-to-r p-[2px] rounded-lg overflow-hidden",
        renderTierStyles(tier)
      )}
    >
      <div className="bg-black back overflow-hidden rounded-lg h-full">
        <div className="flex flex-col items-center relative">
          <div
            className="pt-4 pb-[1.5] cursor-pointer z-10 absolute right-2 top-1"
            onClick={() => {
              handleDismiss(id);
            }}
          >
            <CloseButtonSVG
              height={32}
              width={32}
              className="text-gray-400 hover:text-red-500"
            />
          </div>
          <div className="wrapper w-[480px] h-[480px] -translate-y-16">
            <Image
              src={media.heroImageUrl}
              alt={metadata.PlayerJerseyName}
              width="100%"
              height="100%"
              layout="responsive"
            />
          </div>
        </div>

        <div className="info -translate-y-36 p-2 flex flex-col justify-around items-start">
          <h1 className="text-2xl text-left">
            {PlayerFirstName} {PlayerLastName}
          </h1>
          <h3>#{transformTier(tier)}</h3>
          <span>
            Lowest ask:
            <h1>{numMinted}$</h1>
          </span>
        </div>
      </div>
    </div>
  );
};
