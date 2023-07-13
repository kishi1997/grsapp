import axios from "axios";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export async function getGitHubUserInfo(accessToken: string) {
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
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
      session.user.accessToken = token.accessToken;
      session.user.bio = userInfo.bio;
      session.user.following = userInfo.following;
      session.user.followers = userInfo.followers;
      session.user.stars = userInfo.stars;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token
    },
  },
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };