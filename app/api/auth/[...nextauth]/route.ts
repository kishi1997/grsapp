import axios from "axios";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export async function getGitHubUserInfo(accessToken: string) {
  // ユーザー情報取得のためのAPI
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // ユーザーのスター数取得のためのAPI
  const starredResponse = await axios.get('https://api.github.com/user/starred', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userInfo = response.data;
  userInfo.stars = starredResponse.data.length;
  return userInfo;
}

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
      const userInfo = await getGitHubUserInfo(token.accessToken);
      // デフォルト値以外で取得したい情報
      session.user.accessToken = token.accessToken;
      session.user.bio = userInfo.bio;
      session.user.following = userInfo.following;
      session.user.followers = userInfo.followers;
      session.user.stars = userInfo.stars;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token
    },
  },
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };