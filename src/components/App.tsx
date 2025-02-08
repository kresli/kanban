import { useState } from "react";
import { Api } from "src/api";
import { ApiContext } from "src/contexts/api.context";
import { initDB } from "./temp.init";
import { Router } from "src/routes/Router";
import { QueryClient, QueryClientProvider } from "react-query";

export function App() {
  const [db] = useState(() => {
    const db = new Api();
    initDB(db, false);
    return db;
  });
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={db}>
        <Router />
      </ApiContext.Provider>
    </QueryClientProvider>
  );
}
