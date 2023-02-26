import DarkModeButton from "@components/DarkModeButton";
import StorageDropdown from "@components/Storage/StorageDropdown";
import { StorageIcon as StorageIconStatic } from "@components/Storage/StorageIcon";
import { HomeSVG } from "@components/SVGIcons/HomeSVG";
import { usePreferredPlaysStorageStore } from "@states/app";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";

const StorageIcon = dynamic<React.ComponentProps<typeof StorageIconStatic>>(
  () =>
    import("@components/Storage/StorageIcon").then((data) => data.StorageIcon),
  {
    ssr: false,
  }
);

export const ScreenLayout: IComponent = ({ children }) => {
  const router = useRouter();
  const { hidden } = usePreferredPlaysStorageStore();
  return (
    <div className="h-full min-h-screen flex flex-col">
      <div className="pt-8 pl-6 z-30 w-fit" onClick={() => router.push("/")}>
        <Image
          src="/compala_logo.png"
          alt="deVin Logo"
          width={200}
          height={200}
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
