import Hero from '~/components/hero'
import type {LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {getLeaderboard} from '~/models/user.server'
import {useLoaderData} from '@remix-run/react'
import {Leaderboard} from '~/components/leaderboard'

type LoaderData = Awaited<ReturnType<typeof getLeaderboard>>

export const loader: LoaderFunction = async () => {
  const leaderboard = await getLeaderboard()
  return json(leaderboard)
}

export default function Index() {
  // const user = useOptionalUser()
  const leaderboard = useLoaderData<LoaderData>()
  console.log({leaderboard})
  return (
    // <main className={'mx-auto max-w-7xl sm:px-6 lg:px-8'}>
    <main>
      <Hero />
      <section className={'w-full'}>
        <h1>Leaderboard</h1>
        {leaderboard.map((e) => {
          return (
            <p key={`user-${e.username}-${e.email}`}>
              {e.username ?? e.email}
              {e._count.logs}
            </p>
          )
        })}
        <Leaderboard />
      </section>
    </main>
  )
}
