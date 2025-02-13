import { useState } from "react";
import { Router } from "src/routes/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApiProvider } from "./ApiProvider";

export function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider databaseName="kresli-kanban" userId="john-doe">
        <Router />
      </ApiProvider>
    </QueryClientProvider>
  );
}
