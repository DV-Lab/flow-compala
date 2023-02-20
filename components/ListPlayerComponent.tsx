import useDebounce from "@hooks/useDebounce";
import { TransitionLayout } from "@layouts/TransitionLayout";
import { Input } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { ComponentLoading } from "./ComponentLoading";
import { ListPlaysComponent } from "./ListPlaysComponent";
import { CloseButtonSVG } from "./SVGIcons/CloseButtonSVG";
import { LoadingSVG } from "./SVGIcons/LoadingSVG";
import { SearchSVG } from "./SVGIcons/SearchSVG";

export const ListPlayerComponent: IComponent = () => {
  const [data, setData] = useState<IPlayerInfo[]>([]);
  const [query, setQuery] = useState<string>("");
  const debouncedSearch = useDebounce(query, 500);

  const router = useRouter();

  const fetchPlayers = useCallback(() => {
    fetch(`/api/players`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => setData(data));
  }, []);

  const searchPlayers = useCallback(() => {
    fetch(`/api/player?q=${debouncedSearch}`)
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

  useEffect(() => {
    if (debouncedSearch) {
      searchPlayers();
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
        {data.length > 0 ? (
          <ul>
            {data.map((player, index) => (
              <li
                key={index}
                className="flex items-center gap-4 border-gray-500 border-b py-4"
              >
                <ListPlaysComponent playsList={player.playIds} />
              </li>
            ))}
          </ul>
        ) : (
          <ComponentLoading />
        )}
      </TransitionLayout>
    </div>
  );
};
