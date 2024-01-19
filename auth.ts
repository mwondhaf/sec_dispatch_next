import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { postData } from "./app/actions/fetch-helper";
import { loginSchema } from "./lib/schemas/auth-schema";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        idNumber: { label: "ID", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const validatedCredentials = loginSchema.safeParse(credentials);
        if (!validatedCredentials.success) {
          throw new Error(validatedCredentials.error.message);
        }

        const { idNumber, password } = validatedCredentials.data;

        // fetch
        const user = await postData("auth/id-login", { idNumber, password });
        if (user && user?.statusCode !== 401) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/login", // Error code passed in query string as ?error=
  },
  trustHost: true,

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }): Promise<any> {
      if (user) {
        // verfify jwt
        const verifiedToken: any = jwt.verify(
          user.accessToken,
          process.env.AUTH_SECRET as string,
        );
        token = { accessToken: user.accessToken };
        token.exp = verifiedToken.exp;
        user.iat = verifiedToken.iat;
        user.exp = verifiedToken.exp;
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }): Promise<any> {
      session.user = token as any;
      return session;
    },
  },
});
