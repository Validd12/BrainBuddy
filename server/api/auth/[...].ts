// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import TwitchProvider from 'next-auth/providers/google'

const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
  pages: {  
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = !!user
      if (isSignIn) {
        token.subscribed = user ? (user as any).subscribed || true : false
      }
      return Promise.resolve(token)
    },
    async session({ session, token }) {
      (session as any).subscribed = token.subscribed
      return Promise.resolve(session)
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.public.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    TwitchProvider.default({
      clientId: runtimeConfig.public.GOOLGE_CLIENT_ID,
      clientSecret: runtimeConfig.GOOGLE_CLIENT_SECRET,
    }),
  ],
})
