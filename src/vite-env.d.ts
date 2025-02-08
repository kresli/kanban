/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_BACKEND_STRATEGY: "socket" | "local";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
