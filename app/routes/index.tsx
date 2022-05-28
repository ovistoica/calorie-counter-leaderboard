import Hero, {links as heroLinks} from '~/components/hero'
import type {LinksFunction, LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {getLeaderboard} from '~/models/user.server'
import {useLoaderData} from '@remix-run/react'
import {links as leaderboardLinks} from '~/components/leaderboard'

type LoaderData = Awaited<ReturnType<typeof getLeaderboard>>

export const links: LinksFunction = () => {
  return [...heroLinks(), ...leaderboardLinks()]
}

export const loader: LoaderFunction = async () => {
  const leaderboard = await getLeaderboard()
  return json(leaderboard)
}

const defaultImage =
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

export default function Index() {
  const leaderboard = useLoaderData<LoaderData>()
  return (
    <main>
      <Hero />
      <section className="leaderboard">
        <h1>Leaderboard</h1>

        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Points</th>
              <th scope="col">Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((person) => (
              <tr key={person.email}>
                <td>
                  <div className="person">
                    <img src={defaultImage} alt="" />
                    <div>{person.username ?? person.email}</div>
                  </div>
                </td>
                <td>{person._count.logs}</td>
                <td>3</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
