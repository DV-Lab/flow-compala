import { CloseButtonSVG } from "@components/SVGIcons/CloseButtonSVG";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { SearchSVG } from "@components/SVGIcons/SearchSVG";
import useDebounce from "@hooks/useDebounce";
import { TransitionLayout } from "@layouts/TransitionLayout";
import { Input, Radio, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { CheckedPlayComponent } from "./CheckedPlayComponent";
import { CustomizedTierLabelComponent } from "./CustomizedTierLabelComponent";

export const PlayerListComponent: IComponent = () => {
  const [data, setData] = useState<IPlayerInfo[]>([]);
  const [query, setQuery] = useState<string>("");
  const debouncedSearch = useDebounce(query, 750);
  const [searchedField, setSearchedField] = useState<string>("name");
  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();

  const fetchPlayers = useCallback(() => {
    fetch(`/api/players`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleTierFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue("");
    setQuery(event.target.value);
    setSearchedField("tier");
  };
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setQuery(event.target.value);
    setSearchedField("name");
  };
  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    const searchPlayersByField = (field: string) => {
      fetch(`/api/players?${field}=${debouncedSearch}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          setData(data);
        });
    };
    if (debouncedSearch) {
      searchPlayersByField(searchedField);
    }
  }, [debouncedSearch, searchedField]);

  return (
    <div className="p-1 flex flex-col gap-8 overflow-y-scroll">
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
          value={searchValue}
          onChange={handleSearchInput}
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

      <div className="filter-groups">
        <div className="tier-group font-serif !text-white !text-lg">
          <Typography variant="h5" className="font-serif text-white">
            Tier:{" "}
          </Typography>
          <div className="flex flex-col">
            <span className="flex items-center">
              <Radio
                id="Legendary"
                value="LEGENDARY"
                name="tier"
                color="teal"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onChange={handleTierFilter}
              />
              <CustomizedTierLabelComponent text="Legendary" />
            </span>
            <span className="flex items-center">
              <Radio
                id="Rare"
                value="RARE"
                name="tier"
                color="teal"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onChange={handleTierFilter}
              />
              <CustomizedTierLabelComponent text="Rare" />
            </span>

            <span className="flex items-center">
              <Radio
                id="Uncommon"
                value="UNCOMMON"
                name="tier"
                color="teal"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onChange={handleTierFilter}
              />
              <CustomizedTierLabelComponent text="Uncommon" />
            </span>
            <span className="flex items-center">
              <Radio
                id="Common"
                value="COMMON"
                name="tier"
                color="teal"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onChange={handleTierFilter}
              />
              <CustomizedTierLabelComponent text="Common" />
            </span>
          </div>
        </div>
      </div>
      <TransitionLayout location={router.pathname}>
        {data?.length > 0 ? (
          <ul>
            {data.map(({ name, plays }, index) => (
              <li key={index}>
                <h1 className="p-2 bg-gray-900 rounded-lg">{name}</h1>
                <CheckedPlayComponent playsList={plays} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="!w-full !h-full flex items-center justify-center">
            <LoadingSVG width={48} height={48} className="fill-teal-600" />
          </div>
        )}
      </TransitionLayout>
    </div>
  );
};