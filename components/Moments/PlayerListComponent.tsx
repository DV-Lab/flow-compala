import { CloseButtonSVG } from "@components/SVGIcons/CloseButtonSVG";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { SearchSVG } from "@components/SVGIcons/SearchSVG";
import useDebounce from "@hooks/useDebounce";
import { TransitionLayout } from "@layouts/TransitionLayout";
import { Input, Radio } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { CheckedPlayComponent } from "./CheckedPlayComponent";
import { CustomizedTierLabelComponent } from "./CustomizedTierLabelComponent";

export const PlayerListComponent: IComponent = () => {
  const router = useRouter();
  const [data, setData] = useState<IPlayerInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");
  const debouncedSearch = useDebounce(searchQuery, 750);
  const debouncedFilter = useDebounce(filterQuery, 500);

  const initialCheckedTierRadioArray = {
    LEGENDARY: false,
    RARE: false,
    UNCOMMON: false,
    COMMON: false,
  };
  const [checkedTierRadioArray, setCheckedTierRadioArray] = useState<{
    [key: string]: boolean;
  }>(initialCheckedTierRadioArray);

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
    setCheckedTierRadioArray({
      ...initialCheckedTierRadioArray,
      [event.target.value]: event.target.checked,
    });
    setData([]);
    setFilterQuery(event.target.value);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    const searchPlayers = () => {
      fetch(`/api/players?name=${debouncedSearch}&tier=${debouncedFilter}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          setData(data);
        });
    };
    if (debouncedSearch || debouncedFilter) {
      searchPlayers();
    }
  }, [debouncedSearch, debouncedFilter]);

  return (
    <div className="min-h-[80vh] p-1 flex flex-col gap-8 overflow-y-scroll h-full">
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
          value={searchQuery}
          onChange={handleSearchInput}
        />
        <div
          className=" pt-4 pb-[1.5] cursor-pointer"
          onClick={() => {
            setSearchQuery("");
            setFilterQuery("");
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
          <h2 className="font-serif text-white">Tier: </h2>
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
                checked={checkedTierRadioArray.LEGENDARY}
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
                checked={checkedTierRadioArray.RARE}
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
                checked={checkedTierRadioArray.UNCOMMON}
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
                checked={checkedTierRadioArray.COMMON}
              />
              <CustomizedTierLabelComponent text="Common" />
            </span>
            <span
              className="mt-6 mx-8 font-serif font-medium hover:text-red-400 border-b border-transparent hover:border-b hover:border-red-400 cursor-pointer w-fit duration-200"
              onClick={() => {
                setCheckedTierRadioArray(initialCheckedTierRadioArray);
                fetchPlayers();
              }}
            >
              Clear
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
