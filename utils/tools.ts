import classNames from "classnames";

/**
 * Mapping hotkey into className package for better usage
 */
const cx = classNames;

const transformTier = (tier: string) => {
  return tier.charAt(0) + tier.slice(1).toLowerCase();
};
export { cx, transformTier };
