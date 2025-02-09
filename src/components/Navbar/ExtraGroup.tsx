import { IconInfoCircle, IconSettings } from "@tabler/icons-react";
import { ROUTE_URL } from "src/utils/route-url";
import { ExtraGroupItem } from "./ExtraGroupItem";

export function ExtraGroup() {
  const toSettings = ROUTE_URL.settings();
  const toInfo = ROUTE_URL.info();
  return (
    <div className="flex w-full flex-col gap-1 px-2 pt-2 pb-6">
      <ExtraGroupItem
        to={toSettings}
        title="Settings"
        icon={<IconSettings size={16} />}
      />
      <ExtraGroupItem
        to={toInfo}
        title="About"
        icon={<IconInfoCircle size={16} />}
      />
    </div>
  );
}
