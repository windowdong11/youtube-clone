/// <reference types="NodeJS" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV?: string;
    readonly CLIENT: string;
    readonly SSL_PRIVATE_KEY: string;
    readonly SSL_CERT_CHAIN: string;
    readonly AUTH0_AUDIENCE: string;
    readonly AUTH0_DOMAIN: string;
    readonly DB_HOST: string;
    readonly DB_USER: string;
    readonly DB_PASSWORD: string;
    readonly DB_DATABASE: string;
    readonly PORT: string;
  }
}