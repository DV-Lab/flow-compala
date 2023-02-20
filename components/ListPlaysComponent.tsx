import { Checkbox, Typography } from "@material-tailwind/react";
import { useCompareListStore } from "@states/app";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ComponentLoading } from "./ComponentLoading";
import { LoadingSVG } from "./SVGIcons/LoadingSVG";

export const ListPlaysComponent: IComponent<{
  playsList: string[];
}> = ({ playsList }) => {
  const { playIds, count, setPlayIds, setIncreaseCount, setDecreaseCount } =
    useCompareListStore();
  const [listPlays, setListPlays] = useState<IPlays[]>([]);
  const fetchAllPlaysById = useCallback((id: string) => {
    fetch(`/api/plays?playId=${id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => setListPlays((prev) => [...prev, data]));
  }, []);
  const handleCheck = (id: string) => {
    if (playsList) {
      if (playIds.includes(id)) {
        const newPlayIds = playIds.filter((play) => play !== id);
        setPlayIds(newPlayIds);
        setDecreaseCount();
        return;
      }
      //   if (count < 3) {
      //     const clickedPlays = data.find(
      //       (item: IPlayerInfo) => item.name === name
      //     );
      //     if (clickedPlayer) {
      //       const newPlayers = [...players, { ...clickedPlayer }];
      //       setPlayers(newPlayers);
      //       setIncreaseCount();
      //     }
      //     return;
      //   }
    }
  };

  useEffect(() => {
    playsList?.forEach((id) => fetchAllPlaysById(id));
  }, []);
  return (
    <div>
      {listPlays.length > 0 ? (
        <div>
          {listPlays.map((play, index) => (
            <div key={index}>
              <div>
                <Image
                  src="/cr7.png"
                  alt={play.metadata.PlayDataID}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <Typography className="grow" variant="h6">
                {play.metadata.PlayerJerseyName}
              </Typography>
              <Checkbox
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onClick={() => handleCheck(play.id)}
                // disabled={
                //   !(count === 0 || count < 3) &&
                //   !clickedPlayerList.includes(player.name)
                // }
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
