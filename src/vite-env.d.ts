// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
