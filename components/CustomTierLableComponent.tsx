import { gradientText } from "@configs/styles";
import { cx } from "@utils/tools";
import { TIER_TYPE } from "constant/tier";
import { useCallback } from "react";

export const CustomTierLabelComponent: IComponent<{
  text: string;
}> = ({ text }) => {
  const renderTierStyles = useCallback(
    (tier: string) => {
      switch (tier) {
        case TIER_TYPE.LEGENDARY:
          return "from-indigo-300 via-purple-300 to-pink-700";

        case TIER_TYPE.RARE:
          return "from-white via-yellow-700 to-yellow-900";
        case TIER_TYPE.UNCOMMON:
          return "from-green-50 via-green-300 to-green-600";
        case TIER_TYPE.COMMON:
          return "from-blue-300 via-blue-400 to-blue-500";
        default:
          return "";
      }
    },
    [text]
  );

  return (
    <label className={cx(gradientText, renderTierStyles(text.toUpperCase()))}>
      #{text}
    </label>
  );
};
