/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_SERVER: string;
    readonly REACT_APP_AUTH0_DOMAIN: string;
    readonly REACT_APP_AUTH0_CLIENT_ID: string;
    readonly REACT_APP_AUTH0_AUDIENCE: string;
  }
}