import NextAuth from 'next-auth'
import type { DefaultSession } from 'next-auth'
import type { JWT } from "next-auth/jwt"

namespace NODEJS {
    interface ProcessEnv extends NodeJS.processEnv {
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
    }
}

declare module 'next-auth' {
  interface Session {
    user: {
    accessToken?: string;
    } & DefaultSession['user']
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken? : string;
  }
}
