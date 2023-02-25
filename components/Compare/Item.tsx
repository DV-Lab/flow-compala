import { CustomizedTierLabelComponent } from "@components/Moments/CustomizedTierLabelComponent";
import {
  useCompareListStore,
  usePreferredPlaysStorageStore,
} from "@states/app";
import { cx, transformTier } from "@utils/tools";
import { TIER_TYPE } from "constant/tier";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { CloseButtonSVG } from "../SVGIcons/CloseButtonSVG";
import { HeartSVG } from "../SVGIcons/HeartSVG";
import { CompareChart } from "./Chart";

export const CompareItem: IComponent<{
  id: string;
  metadata: IPlayMetadata;
  media: IPlayMedia;
  edition: IPlayEdition;
  nftMoment: IPlayNft;
}> = ({ id, metadata, media, edition, nftMoment }) => {
  const {
    MatchHomeTeam,
    MatchAwayTeam,
    MatchSeason,
    MatchHomeScore,
    MatchAwayScore,
    PlayerFirstName,
    PlayerLastName,
    PlayType,
  } = metadata;
  const { tier } = edition;
  const { frontImageUrl } = media;
  const { amount, sales } = nftMoment;
  const { comparedPlays, setComparedPlays, setDecreaseNumOfComparedPlays } =
    useCompareListStore();
  const { preferredPlays, setPreferredPlays } = usePreferredPlaysStorageStore();

  const [clicked, setClicked] = useState<boolean>(false);

  const handleAddToStorage = (play: IPlay) => {
    const existedPlay = preferredPlays.find((p) => p.playId === play.playId);
    if (existedPlay) {
      return;
    }
    const newPreferredPlays = [...preferredPlays, play];
    setPreferredPlays(newPreferredPlays);
    setClicked(true);
  };

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

  const play: IPlay = {
    avatar: frontImageUrl,
    match: `${MatchHomeTeam} vs ${MatchAwayTeam}`,
    matchSeason: MatchSeason,
    playId: id,
    playType: PlayType,
    tier: tier,
  };

  const renderInfo = useMemo(
    () => (
      <div className="play-info grow flex flex-col gap-2 w-full">
        <h1 className="text-4xl font-semibold">
          {PlayerFirstName + PlayerLastName}
        </h1>
        <CustomizedTierLabelComponent
          className="text-lg"
          text={transformTier(tier)}
        />
        <h2 className="play-type text-gray-600 font-medium text-lg">
          {PlayType} &#9830; {MatchSeason}
        </h2>
        <div className="flex justify-center py-3">
          <div className="flex gap-2">
            <div className="grow text-right">
              <h2 className="play-match text-gray-400 font-medium text-lg ">
                {MatchHomeTeam}
              </h2>

              <h2 className="play-match text-gray-400 font-medium text-lg ">
                {MatchHomeScore}
              </h2>
            </div>
            <div className="text-center">
              <h2 className="play-match text-gray-400 font-medium text-lg">
                vs
              </h2>
              <h2 className="play-match text-gray-400 font-medium text-lg">
                -
              </h2>
            </div>
            <div className="grow text-left">
              <h2 className="play-match text-gray-400 font-medium text-lg">
                {MatchAwayTeam}
              </h2>

              <h2 className="play-match text-gray-400 font-medium text-lg">
                {MatchAwayScore}
              </h2>
            </div>
          </div>
        </div>
      </div>
    ),
    [
      MatchHomeTeam,
      MatchAwayTeam,
      MatchSeason,
      MatchHomeScore,
      MatchAwayScore,
      PlayerFirstName,
      PlayerLastName,
      PlayType,
      tier,
    ]
  );

  return (
    <div
      className={cx(
        "bg-gradient-to-r p-[2px] rounded-lg overflow-hidden",
        renderTierStyles(tier)
      )}
    >
      <div className="bg-black back overflow-hidden rounded-lg h-full">
        <div className="flex flex-col items-center">
          <div className="control-button-group w-full flex justify-between gap-1 z-10 p-2">
            <div
              className="cursor-pointer"
              onClick={() => {
                handleAddToStorage(play);
              }}
            >
              <HeartSVG
                height={32}
                width={32}
                color={`${clicked ? "red" : ""} `}
                className={`${clicked ? "text-transparent" : ""} `}
              />
            </div>
            <div
              className="cursor-pointer"
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

        <div className="info px-4 flex flex-col justify-around items-start -translate-y-16">
          {renderInfo}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="play-type  text-white font-semibold text-3xl">
                Current sale:
              </h2>

              <p className="play-type px-4 text-gray-200 font-medium text-xl py-1">
                Price: {sales?.currentPrice ?? "-"} USD
              </p>
              <p className="play-type px-4 text-gray-200 font-medium text-xl py-1">
                For sale: {sales?.forSale ?? "-"}
              </p>
            </div>
            <div>
              <h2 className="play-type  text-white font-semibold text-3xl">
                History sale:
              </h2>

              <p className="play-type px-4 text-gray-200 font-medium text-xl py-1">
                Average price: {sales?.avgPrice ?? "-"} USD
              </p>
              <p className="play-type px-4 text-gray-200 font-medium text-xl py-1">
                Highest price: {sales?.highestPrice ?? "-"} USD
              </p>
            </div>
            <div className="py-4">
              <h2 className="play-type  text-white font-semibold text-3xl">
                Edition data
              </h2>
              <p className="play-type px-4 text-gray-200 font-medium text-xl py-1">
                Total edition: {amount.maximum}
              </p>
            </div>
          </div>

          <CompareChart amountData={amount} />
        </div>
      </div>
    </div>
  );
};
