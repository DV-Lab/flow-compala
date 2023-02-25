import { CompareTable } from "@components/Compare/Table";
import { PlayerListComponent } from "@components/Moments/PlayerListComponent";

export const AppScreen: IComponent = () => {
  return (
    <main className="h-full dark:text-white p-4">
      <div className="grid grid-cols-4 gap-8 h-full">
        <div className="relative">
          <PlayerListComponent />
        </div>
        <div className="col-span-3">
          <CompareTable />
        </div>
      </div>
    </main>
  );
};
