import { Outlet } from "react-router";
import { Navbar } from "src/components/Navbar";

export function Page() {
  return (
    <div className="fixed box-border flex h-screen w-screen flex-col overflow-hidden">
      <div className="flex h-full flex-grow flex-row overflow-hidden">
        <Navbar />
        <div className="h-full flex-grow overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
