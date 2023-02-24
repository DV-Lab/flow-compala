// import { selectCartItemsCount } from "features/Cart/cart.selector";
import { StorageSVG } from "@components/SVGIcons/StorageSVG";
import { usePreferredPlaysStorageStore } from "@states/app";

const StorageIcon: IComponent = () => {
  const { setHidden, preferredPlays } = usePreferredPlaysStorageStore();
  const handleCartIconClick = () => {
    setHidden();
  };
  return (
    <div
      className="w-[45px] h-[45px] cursor-pointer relative"
      onClick={handleCartIconClick}
    >
      <StorageSVG width={36} height={36} />
      <span className="item-count text-orange-700 text-base py-[1px] px-[6px] absolute top-[11px] right-[16px]">
        {preferredPlays.length}
      </span>
    </div>
  );
};

export default StorageIcon;
