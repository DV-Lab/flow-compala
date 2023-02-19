import useDebounce from "@hooks/useDebounce";
import { TransitionLayout } from "@layouts/TransitionLayout";
import { Checkbox, Input, Typography } from "@material-tailwind/react";
import { useCompareListStore } from "@states/app";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CloseButtonSVG } from "./SVGIcons/CloseButtonSVG";
import { SearchSVG } from "./SVGIcons/SearchSVG";

export const ListPlayer: IComponent = () => {
  const [data, setData] = useState<IPlayerInfo[]>([]);
  const [query, setQuery] = useState<string>("");
  const debouncedSearch = useDebounce(query, 500);
  const { players, count, setPlayers, setIncreaseCount, setDecreaseCount } =
    useCompareListStore();

  const router = useRouter();

  const fetchPlayers = useCallback(() => {
    fetch(`/api/player`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => setData(data));
  }, []);

  const handleCheck = (name: string) => {
    if (data) {
      if (clickedPlayerList.includes(name)) {
        const newPlayers = players.filter((player) => player.name !== name);
        setPlayers(newPlayers);
        setDecreaseCount();
        return;
      }
      if (count < 3) {
        const clickedPlayer: IPlayerInfo | undefined = data.find(
          (item: IPlayerInfo) => item.name === name
        );
        if (clickedPlayer) {
          const newPlayers = [...players, { ...clickedPlayer }];
          setPlayers(newPlayers);
          setIncreaseCount();
        }
        return;
      }
    }
  };

  const clickedPlayerList = useMemo(() => {
    return players.map((player) => player.name);
  }, [players]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      fetch(`/api/player?q=${debouncedSearch}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => setData(data));
    }
  }, [debouncedSearch]);

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };
  return (
    <div className="p-8 flex flex-col gap-8 overflow-y-scroll">
      <div className="search-component flex gap-2">
        <div className=" pt-4 pb-[1.5]">
          <SearchSVG className="text-white" width={24} height={24} />
        </div>
        <Input
          variant="static"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          color="gray"
          className="text-white p-0"
          value={query}
          onChange={handleChange}
        />
        <div
          className=" pt-4 pb-[1.5] cursor-pointer"
          onClick={() => {
            setQuery("");
            fetchPlayers();
          }}
        >
          <CloseButtonSVG
            height={32}
            width={32}
            className="text-gray-400 hover:text-red-500"
          />
        </div>
      </div>
      <TransitionLayout location={router.pathname}>
        <ul>
          {data.map((player, index) => (
            <li
              key={index}
              className="flex items-center gap-4 border-gray-500 border-b py-4"
            >
              <div>
                <Image
                  src={player.avatar}
                  alt={player.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <Typography className="grow" variant="h6">
                {player.name}
              </Typography>
              <Checkbox
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onClick={() => handleCheck(player.name)}
                disabled={
                  !(count === 0 || count < 3) &&
                  !clickedPlayerList.includes(player.name)
                }
              />
            </li>
          ))}
        </ul>
      </TransitionLayout>
    </div>
  );
};
