import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
              params: { scope: "repo" },
            },
        }),
    ],
    callbacks: {
      async session({ session, token }) {
        session.user.accessToken = token.accessToken;
        return session;
      },
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token
        }
        return token
      },
    },
    session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };