import { CompareTable } from "@components/Compare/Table";
import { PlayerListComponent } from "@components/Moments/PlayerListComponent";

export const AppScreen: IComponent = () => {
  return (
    <main className="min-h-screen dark:text-white p-4">
      <div className="grid grid-cols-4 gap-8">
        <PlayerListComponent />
        <div className="col-span-3">
          <CompareTable />
        </div>
      </div>
    </main>
  );
};
