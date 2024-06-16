// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";
import { JWT } from "next-auth/jwt";

// ユーザー情報取得のための関数
export async function getGitHubUserInfo(accessToken: string) {
  const response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const starredResponse = await axios.get(
    "https://api.github.com/user/starred",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const userInfo = response.data;
  userInfo.stars = starredResponse.data.length;
  return userInfo;
}

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: { scope: "repo" },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      const userInfo = await getGitHubUserInfo(token.accessToken as string);
      session.user.accessToken = token.accessToken;
      session.user.bio = userInfo.bio;
      session.user.following = userInfo.following;
      session.user.followers = userInfo.followers;
      session.user.stars = userInfo.stars;
      return session;
    },
    async jwt({ token, account }: { token: JWT; account?: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  session: { strategy: "jwt" }, // 修正: リテラル型 'jwt' を指定
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
