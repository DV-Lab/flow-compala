import { ScreenLayout } from "@layouts/ScreenLayout";
import { AppScreen } from "@screens/app";

const Home: IPageComponent = () => {
  return <AppScreen />;
};

Home.getLayout = (screen) => <ScreenLayout>{screen}</ScreenLayout>;

export default Home;
