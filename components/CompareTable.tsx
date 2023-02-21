import useDebounce from "@hooks/useDebounce";
import { Typography } from "@material-tailwind/react";
import { useCompareListStore } from "@states/app";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CompareItem } from "./CompareItem";
import { BoxSVG } from "./SVGIcons/BoxSVG";

export const CompareTable: IComponent = () => {
  const { comparedPlays, numOfComparedPlays } = useCompareListStore();
  const debouncedQuery = useDebounce(comparedPlays, 100);
  const [data, setData] = useState<IPlayMetadata[]>();

  const fetchDetailsOfComparesPlays = useCallback(() => {
    console.log({ debouncedQuery });
    fetch("/api/plays/details", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playIds: debouncedQuery }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      fetchDetailsOfComparesPlays();
    }
  }, [debouncedQuery]);

  const renderData = useMemo(
    () => (
      <div className=" grid grid-cols-3 gap-4">
        {data &&
          data
            .sort(
              (a, b) =>
                -(a.metadata.PlayerFirstName < b.metadata.PlayerFirstName)
            )
            .map((play, index) => (
              <CompareItem
                key={index}
                image={play.media.frontImageUrl}
                name={play.metadata.PlayerJerseyName}
                knownName={play.metadata.PlayerKnownName}
              />
            ))}
      </div>
    ),
    [data]
  );
  return (
    <div className="text-white p-8 border mr-8 border-white rounded-lg h-[80vh]">
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
