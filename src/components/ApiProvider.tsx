import { PropsWithChildren, useState } from "react";
import { Api } from "src/api";
import { ApiContext } from "src/contexts/api.context";

export function ApiProvider(
  props: PropsWithChildren<{
    databaseName: string;
    userId: string;
  }>,
) {
  const [api] = useState(() => {
    const db = new Api({
      databaseName: props.databaseName,
      userId: props.userId,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).kanbanApi = db;
    return db;
  });
  return (
    <ApiContext.Provider value={api}>{props.children}</ApiContext.Provider>
  );
}
