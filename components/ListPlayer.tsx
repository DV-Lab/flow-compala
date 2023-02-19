import useDebounce from "@hooks/useDebounce";
import { TransitionLayout } from "@layouts/TransitionLayout";
import { Input, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CloseButtonSVG } from "./SVGIcons/CloseButtonSVG";
import { SearchSVG } from "./SVGIcons/SearchSVG";

export const ListPlayer: IComponent = () => {
  const [data, setData] = useState<IPlayerInfo[]>([]);
  const [query, setQuery] = useState<string>("");
  const debouncedSearch = useDebounce(query, 500);
  const router = useRouter();

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

  const fetchPlayers = useCallback(() => {
    fetch(`/api/player`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const renderData = useMemo(
    () =>
      data.map((player, index) => (
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
          <Typography variant="h6">{player.name}</Typography>
        </li>
      )),
    [data]
  );
  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };
  return (
    <TransitionLayout location={router.pathname}>
      <div className="p-8 flex flex-col gap-8">
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
        <ul>{renderData}</ul>
      </div>
    </TransitionLayout>
  );
};
