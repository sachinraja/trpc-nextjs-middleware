import { router, TRPCError } from '@trpc/server'
import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  bio: z.string(),
})

type User = z.infer<typeof userSchema>

const users: User[] = [
  {
    id: 0,
    name: 'John Doe',
    bio: 'software engineer',
  },
]

export const userRouter = router()
  .query('get', {
    input: z.object({
      id: z.number(),
    }),
    resolve({ input }) {
      const user = users.find((user) => user.id === input.id)

      if (!user) throw new TRPCError({ code: 'NOT_FOUND' })

      return user
    },
  })
  .query('list', {
    resolve() {
      return users
    },
  })
  .mutation('create', {
    input: userSchema.omit({ id: true }),
    resolve({ input }) {
      const newUser: User = {
        id: users.length,
        ...input,
      }

      users.push(newUser)
      return newUser
    },
  })
