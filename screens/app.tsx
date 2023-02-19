import { CompareTable } from "@components/CompareTable";
import { ListPlayer } from "@components/ListPlayer";

export const AppScreen: IComponent = () => {
  return (
    <main className="min-h-screen dark:text-white p-8">
      <div className="grid grid-cols-4 gap-8">
        <ListPlayer />
        <div className="col-span-3">
          <CompareTable />
        </div>
      </div>
    </main>
  );
};
