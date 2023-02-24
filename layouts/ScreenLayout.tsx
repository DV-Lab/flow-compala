import DarkModeButton from "@components/DarkModeButton";
import StorageDropdown from "@components/Storage/StorageDropdown";
import StorageIcon from "@components/Storage/StorageIcon";
import { HomeSVG } from "@components/SVGIcons/HomeSVG";
import { usePreferredPlaysStorageStore } from "@states/app";
import { useRouter } from "next/router";

export const ScreenLayout: IComponent = ({ children }) => {
  const router = useRouter();
  const { hidden } = usePreferredPlaysStorageStore();
  return (
    <div className="h-full flex flex-col">
      <div className="py-8 px-8 z-30 w-fit" onClick={() => router.push("/")}>
        <HomeSVG
          className="cursor-pointer hover:scale-105 duration-150  dark:text-white"
          width={28}
          height={28}
        />
      </div>
      <div className="flex items-center absolute top-0 right-0">
        <div>
          <StorageIcon />
          {!hidden ? <StorageDropdown /> : null}
        </div>
        <DarkModeButton />
      </div>

      <div className="grow">{children}</div>
    </div>
  );
};
