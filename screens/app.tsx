import { ListPlayer } from "@components/ListPlayer";

export const AppScreen: IComponent = () => {
  return (
    <main className="mx-2 min-h-screen dark:text-white">
      <div className="grid grid-cols-3 gap-8">
        <ListPlayer />
        <div className="col-span-2">09</div>
      </div>
    </main>
  );
};
