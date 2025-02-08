import { Outlet } from "react-router";
import { Navbar } from "src/components/Navbar";

export function Page() {
  return (
    <div className="fixed box-border flex h-screen w-screen flex-col overflow-hidden">
      {/* <Mainbar /> */}
      <div className="flex h-full flex-grow flex-row overflow-auto">
        <Navbar />
        <div className="h-full flex-grow overflow-visible">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
