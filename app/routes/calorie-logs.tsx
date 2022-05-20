import type {LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {Form, Link, NavLink, Outlet, useLoaderData} from '@remix-run/react'

import {requireUserId} from '~/session.server'
import {useUser} from '~/utils'
import {getCalorieLogItems} from '~/models/calorie-log.server'
import format from 'date-fns/format'

type LoaderData = {
  calorieLogs: Awaited<ReturnType<typeof getCalorieLogItems>>
}

export const loader: LoaderFunction = async ({request}) => {
  const userId = await requireUserId(request)
  const calorieLogs = await getCalorieLogItems({userId})
  return json<LoaderData>({calorieLogs})
}

export default function LogsPage() {
  const data = useLoaderData<LoaderData>()
  const user = useUser()

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Calorie Logs</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Log
          </Link>

          <hr />

          {data.calorieLogs.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <ol>
              {data.calorieLogs.map((log) => (
                <li key={log.id}>
                  <NavLink
                    className={({isActive}) =>
                      `block border-b p-4 text-xl ${isActive ? 'bg-white' : ''}`
                    }
                    to={log.id}
                  >
                    {format(new Date(log.date), 'dd-MM-yyyy')}: {log.calories}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
