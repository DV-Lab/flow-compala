import { Typography } from "@material-tailwind/react";
import { useCompareListStore } from "@states/app";
import { useMemo } from "react";

import { CompareItem } from "./CompareItem";
import { BoxSVG } from "./SVGIcons/BoxSVG";

export const CompareTable: IComponent = () => {
  const { players, count } = useCompareListStore();
  const renderData = useMemo(
    () => (
      <div className=" grid grid-cols-3 gap-4">
        {players
          .sort((a, b) => -(a.name < b.name))
          .map((player, index) => (
            <CompareItem key={index} image={player.avatar} name={player.name} />
          ))}
      </div>
    ),
    [players]
  );
  return (
    <div className="text-white p-8 border mr-8 border-white rounded-lg h-[80vh]">
      {count > 0 ? (
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
