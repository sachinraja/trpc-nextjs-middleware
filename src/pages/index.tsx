import { faker } from '@faker-js/faker'
import type { NextPage } from 'next'
import { trpc } from '~/utils/trpc'

const UsersList = () => {
  const { data: users } = trpc.useQuery(['user.list'])

  if (!users) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {users.map((user) => <div key={user.id}>{user.name} - {user.bio}</div>)}
    </div>
  )
}

const GenerateUserButton = () => {
  const { mutate } = trpc.useMutation(['user.create'])
  const utils = trpc.useContext()

  return (
    <button
      onClick={() => {
        mutate({ name: faker.name.findName(), bio: faker.lorem.words() }, {
          onSuccess() {
            utils.invalidateQueries('user.list')
          },
        })
      }}
    >
      Generate random user
    </button>
  )
}
const Home: NextPage = () => {
  return (
    <div>
      <UsersList />
      <GenerateUserButton />
    </div>
  )
}

export default Home
