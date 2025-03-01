import NextAuth, { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    githubId: string;
    user: {
      email: strring;
      name: string;
      image: string;
      id: number | string;
    }
  }
  interface Token {
    accessToken: string;
    userId: string;
  }
}