import { DEFAULT_NUMBER_OF_COMPARED_MOMENTS } from "@configs/app";
import { Checkbox } from "@material-tailwind/react";
import { useCompareListStore } from "@states/app";
import { useMemo, useState } from "react";

export const CustomCheckBox: IComponent<{
  id: string;
}> = ({ id }) => {
  const { comparedPlays, numOfComparedPlays } = useCompareListStore();
  const [checked, setChecked] = useState<boolean>(true);
  const isCheck = useMemo(
    () => comparedPlays.includes(id),
    [comparedPlays, id]
  );
  return (
    <Checkbox
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      disabled={
        !(
          numOfComparedPlays === 0 ||
          numOfComparedPlays < DEFAULT_NUMBER_OF_COMPARED_MOMENTS
        ) && !comparedPlays.includes(id)
      }
      checked={isCheck && checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
