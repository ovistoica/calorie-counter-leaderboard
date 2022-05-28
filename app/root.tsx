import type {LinksFunction, LoaderFunction, MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import rootCSS from '~/styles/root.css'
import openPropsCss from '~/styles/open-props.css'
import {getUser} from './session.server'

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: rootCSS},
    {rel: 'stylesheet', href: openPropsCss},
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Calorie Counter Leaderboard',
  viewport: 'width=device-width,initial-scale=1',
})

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>
}

export const loader: LoaderFunction = async ({request}) => {
  return json<LoaderData>({
    user: await getUser(request),
  })
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>Calorie Counting Leaderboard</title>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
