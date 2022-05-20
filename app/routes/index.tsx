import {useOptionalUser} from '~/utils'
import Hero from '~/components/hero'
import {json, LoaderFunction} from '@remix-run/node'
import {getLeaderboard} from '~/models/user.server'
import {useLoaderData} from '@remix-run/react'

type LoaderData = Awaited<ReturnType<typeof getLeaderboard>>

export const loader: LoaderFunction = async ({request}) => {
  const leaderboard = await getLeaderboard()
  return json(leaderboard)
}

export default function Index() {
  const user = useOptionalUser()
  const leaderboard = useLoaderData<LoaderData>()
  console.log({leaderboard})
  return (
    <main className={'mx-auto max-w-7xl sm:px-6 lg:px-8'}>
      <Hero />
      <section className={'w-full'}>
        <h1>Leaderboard</h1>
        {leaderboard.map((e) => {
          return (
            <p>
              {e.username ?? e.email}
              {e._count.logs}
            </p>
          )
        })}
      </section>
    </main>
  )
}
