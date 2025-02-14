import { PropsWithChildren, useEffect, useState } from "react";
import { Api } from "src/api";
import { ApiContext } from "src/contexts/api.context";

export function ApiProvider(
  props: PropsWithChildren<{
    databaseName: string;
    userId: string;
  }>,
) {
  const [ready, setReady] = useState(false);
  const [api] = useState(() => {
    const db = new Api({
      databaseName: props.databaseName,
      userId: props.userId,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).kanbanApi = db;
    return db;
  });
  useEffect(() => {
    api.resetDemoBoard().then(() => setReady(true));
  }, [api]);
  if (!ready) return null;
  return (
    <ApiContext.Provider value={api}>{props.children}</ApiContext.Provider>
  );
}
