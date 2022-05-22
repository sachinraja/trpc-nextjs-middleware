import { router } from '@trpc/server'
import { userRouter } from './user'

export const appRouter = router()
  .query('healthz', {
    async resolve() {
      return 'yay!'
    },
  })
  .merge('user.', userRouter)

export type AppRouter = typeof appRouter
