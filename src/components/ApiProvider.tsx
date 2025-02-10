import { PropsWithChildren, useState } from "react";
import { Api } from "src/api";
import { initDB } from "./temp.init";
import { ApiContext } from "src/contexts/api.context";

export function ApiProvider(
  props: PropsWithChildren<{
    databaseName: string;
  }>,
) {
  const [api] = useState(() => {
    const db = new Api(props.databaseName);
    initDB(db, false);
    return db;
  });
  return (
    <ApiContext.Provider value={api}>{props.children}</ApiContext.Provider>
  );
}
