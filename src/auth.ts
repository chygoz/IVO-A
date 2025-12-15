import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { BusinessAccount } from "./types/auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    current_business?: BusinessAccount;
    user: {
      _id: string;
      email: string;
      firstName: string;
      name: string;
      lastName: string;
      token: string;
      type: string;
      business: BusinessAccount;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
    firstName: string;
    lastName: string;
    token: string;
    type: string;
    business: BusinessAccount;
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        code: {},
        email: {},
        password: {},
        fullName: {},
        partnerKey: {},
        phone: {},
        type: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        let defaultAuthPath = "/api/v1/auth/login";

        if (credentials.fullName) {
          defaultAuthPath = "/api/v1/auth/register";
        }

        if (credentials.code) {
          defaultAuthPath = "/api/v1/auth/verify/email";
        }

        const apiResponse = await fetch(
          `${process.env.SERVER_API_URL}${defaultAuthPath}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              ...(credentials.code ? { code: credentials.code } : {}),
              ...(credentials.phone ? { phone: credentials.phone } : {}),
              ...(credentials.fullName
                ? {
                    fullName: credentials.fullName,
                    type: credentials.type,
                  }
                : {}),
            }),
          }
        );

        if (!apiResponse.ok) {
          const res = await apiResponse.json();
          throw new Error(res.message);
        }

        const res = await apiResponse.json();

        if (res?.data?.type !== "staff") {
          throw new Error("not allowed");
        }

        const user = {
          _id: res.data._id,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          type: res.data.type,
          token: res.token,
          business: res.data.business,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ trigger, token, session, user }) {
      if (trigger === "update") {
        const updatedToken = {
          ...token,
          ...session.user,
          updated_current_business: session.current_business,
        };
        return updatedToken;
      }

      if (user) {
        token.id = user._id;
        return {
          ...token,
          accessToken: user.token,
          name: `${user.firstName} ${user.lastName}`,
          type: user.type,
          business: user.business,
        };
      }

      return token;
    },

    async session({ session, token, user }) {
      // Add token properties to session
      //@ts-expect-error session
      session.user.id = token._id;
      //@ts-expect-error session
      session.user.type = token.type;
      //@ts-expect-error session
      session.accessToken = token.accessToken;

      if (token?.business) {
        //@ts-expect-error session
        session.user.business = token.business;
        //@ts-expect-error session
        session.current_business = token.business;
      }

      if (token.updated_current_business) {
        //@ts-expect-error session
        session.current_business = token.updated_current_business;
      }

      return {
        ...session,
        user: { ...session.user, ...user },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signOut: "/auth/logout",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
