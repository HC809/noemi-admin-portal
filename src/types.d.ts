import {User} from "next-auth";

declare module "next-auth" {
  interface User {
    customToken?: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
