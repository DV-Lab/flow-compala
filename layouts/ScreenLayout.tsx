import DarkModeButton from "@components/DarkModeButton";
import { HomeSVG } from "@components/SVGIcons/HomeSVG";
import { useRouter } from "next/router";

export const ScreenLayout: IComponent = ({ children }) => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col">
      <div className="py-8 px-8 z-30 w-fit" onClick={() => router.push("/")}>
        <HomeSVG
          className="cursor-pointer hover:scale-105 duration-150  dark:text-white"
          width={28}
          height={28}
        />
      </div>
      <DarkModeButton />
      <div className="grow">{children}</div>
    </div>
  );
};
