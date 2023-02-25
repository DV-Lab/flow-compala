import useDebounce from "@hooks/useDebounce";
import { useCompareListStore } from "@states/app";
import { useEffect, useMemo, useState } from "react";

import { CompareItem as CompareItemStatic } from "./Item";

import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import dynamic from "next/dynamic";
import { BoxSVG } from "../SVGIcons/BoxSVG";

const CompareItem = dynamic<React.ComponentProps<typeof CompareItemStatic>>(
  () => import("./Item").then((data) => data.CompareItem),
  {
    ssr: false,
    loading: () => (
      <div className="!w-full h-[80vh] flex items-center justify-center">
        <LoadingSVG width={48} height={48} className="fill-teal-600" />
      </div>
    ),
  }
);

export const CompareTable: IComponent = () => {
  const { comparedPlays, numOfComparedPlays } = useCompareListStore();
  const debouncedQuery = useDebounce(comparedPlays, 50);
  const [data, setData] = useState<IPlayInfo[]>();

  useEffect(() => {
    const fetchDetailsOfComparesPlays = () => {
      fetch("/api/plays/details", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playIds: debouncedQuery }),
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    if (debouncedQuery) {
      fetchDetailsOfComparesPlays();
    }
  }, [debouncedQuery]);

  const renderData = useMemo(
    () => (
      <div className={`grid grid-cols-3 gap-4`}>
        {data && data.length > 0 ? (
          data
            ?.sort(
              (a, b) =>
                -(a.metadata.PlayerJerseyName < b.metadata.PlayerJerseyName)
            )
            .map((play, index) => (
              <CompareItem
                id={play.id}
                key={index}
                metadata={play.metadata}
                media={play.media}
                edition={play.edition}
                nftMoment={play.nftMoment}
              />
            ))
        ) : (
          <div className="!w-full h-[80vh] flex items-center justify-center">
            <LoadingSVG width={48} height={48} className="fill-teal-600" />
          </div>
        )}
      </div>
    ),
    [data]
  );
  return (
    <div className="text-white p-2 h-[95%] text-serif">
      {numOfComparedPlays > 0 ? (
        renderData
      ) : (
        <div className="h-full text-white flex items-center justify-center gap-8">
          <BoxSVG className="text-gray-300" />
          <h5 className="text-2xl">
            Please choose the moments you want to compare
          </h5>
        </div>
      )}
    </div>
  );
};
