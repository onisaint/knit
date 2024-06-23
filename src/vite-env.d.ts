/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_KEY: string;
  readonly VITE_FIREBASE_DOMAIN: string;
  readonly VITE_FIREBASE_PROJ: string;
  readonly VITE_FIREBASE_BKT: string;
  readonly VITE_FIREBASE_MSG_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
