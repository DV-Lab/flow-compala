import { ComponentLoading } from "@components/ComponentLoading";
import { ScreenLayout } from "@layouts/ScreenLayout";
import { AppScreen as AppScreenStatic } from "@screens/app";
import dynamic from "next/dynamic";

const AppScreen = dynamic<React.ComponentProps<typeof AppScreenStatic>>(
  () => import("@screens/app").then((data) => data.AppScreen),
  {
    ssr: false,
    loading: () => (
      <div className="h-full">
        <ComponentLoading />
      </div>
    ),
  }
);

const Home: IPageComponent = () => {
  return <AppScreen />;
};

Home.getLayout = (screen) => <ScreenLayout>{screen}</ScreenLayout>;

export default Home;
