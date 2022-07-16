/// <reference types="NodeJS" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly CLIENT: string;
    readonly SSL_PRIVATE_KEY: string;
    readonly SSL_CERT_CHAIN: string;
    readonly AUTH0_AUDIENCE: string;
    readonly AUTH0_DOMAIN: string;
  }
}