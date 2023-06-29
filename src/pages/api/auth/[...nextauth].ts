import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import type {NextAuthOptions, User} from "next-auth";
import {AuthAPIService} from "services/auth-api-service";
import {LoginModel} from "models/auth/login-model";

const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProviders({
      name: "NoemiAPI",
      credentials: {},
      async authorize(
        credentials: {email?: string; password?: string} | undefined
      ) {
        try {
          const model: LoginModel = {
            email: credentials?.email || "",
            password: credentials?.password || "",
          };

          const response = await AuthAPIService.authenticate(model);

          console.log(response);

          const user: User = {
            id: response.email,
            email: response.email,
            name: response.email,
            image: "",
            customToken: response.token,
          };

          console.log(user);

          return user;
        } catch (error: any) {
          console.log(error);
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) token.accessToken = user.customToken;
      return token;
    },

    async session({session, token, user}) {
      if (typeof token.accessToken === "string")
        session.accessToken = token.accessToken;

      return session;
    },
  },
};

export default NextAuth(authOptions);
