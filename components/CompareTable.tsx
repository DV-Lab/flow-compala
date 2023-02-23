import useDebounce from "@hooks/useDebounce";
import { Typography } from "@material-tailwind/react";
import { useCompareListStore } from "@states/app";
import { useEffect, useMemo, useState } from "react";

import { CompareItem } from "./CompareItem";
import { BoxSVG } from "./SVGIcons/BoxSVG";

export const CompareTable: IComponent = () => {
  const { comparedPlays, numOfComparedPlays } = useCompareListStore();
  const debouncedQuery = useDebounce(comparedPlays, 0);
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
      <div className=" grid grid-cols-4 gap-4">
        {data &&
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
              />
            ))}
      </div>
    ),
    [data]
  );
  return (
    <div className="text-white p-2 h-[80vh]">
      {numOfComparedPlays > 0 ? (
        renderData
      ) : (
        <div className="h-full text-white flex items-center justify-center gap-8">
          <BoxSVG className="text-gray-300" />
          <Typography variant="h5"> No item found</Typography>
        </div>
      )}
    </div>
  );
};
