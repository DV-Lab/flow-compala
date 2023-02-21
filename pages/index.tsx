import { ComponentLoading } from "@components/ComponentLoading";
import { ScreenLayout } from "@layouts/ScreenLayout";
import dynamic from "next/dynamic";

const AppScreen = dynamic(
  () => import("@screens/app").then((data) => data.AppScreen),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen">
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
