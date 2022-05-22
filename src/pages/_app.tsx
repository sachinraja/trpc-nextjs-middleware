import { withTRPC } from '@trpc/next'
import { AppProps } from 'next/app'
import type { AppRouter } from '~/server/routers/_app'

const MyApp = (({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
})

export default withTRPC<AppRouter>({
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return { url }
  },
  ssr: true,
})(MyApp)
