import NextAuth from "next-auth";
import { UserProfile } from "./typings";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      accessToken: string | JwtPayload;
      employeeType: string;
      companyId?: string;
      UserProfile: UserProfile[];
    };
  }
}
