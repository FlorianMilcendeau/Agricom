declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';

    readonly DATABASE_HOST: string;
    readonly DATABASE_PORT: string;
    readonly DATABASE_PORT: string;
    readonly DATABASE_HOST: string;
    readonly DATABASE_NAME: string;
    readonly DATABASE_SCHEMA: string;
    readonly DATABASE_USERNAME: string;
    readonly DATABASE_PASSWORD: string;
  }
}
