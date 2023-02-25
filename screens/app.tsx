import { CompareTable } from "@components/CompareTable";
import { ListPlayerComponent } from "@components/ListPlayerComponent";
import { GOLAZOS_ADDRESS } from "@env";

export const AppScreen: IComponent = () => {
  console.log({ GOLAZOS_ADDRESS });
  return (
    <main className="min-h-screen dark:text-white p-4">
      <div className="grid grid-cols-4 gap-8">
        <ListPlayerComponent />
        <div className="col-span-3">
          <CompareTable />
        </div>
      </div>
    </main>
  );
};
