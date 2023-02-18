import DarkModeButton from "@components/DarkModeButton";

export const DefaultLayout: IComponent = ({ children }) => {
  return (
    <div className="relative">
      <DarkModeButton />
      <>{children}</>
    </div>
  );
};
