declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    NEXT_PUBLIC_FRONTEND_URL: string;
    NEXT_PUBLIC_BACKEND_URL: string;
  }
}
