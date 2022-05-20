import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'
import {Form, useCatch, useLoaderData} from '@remix-run/react'
import invariant from 'tiny-invariant'
import {requireUserId} from '~/session.server'
import {CalorieLog} from '@prisma/client'
import {deleteCalorieLog, getLog} from '~/models/calorie-log.server'
import format from 'date-fns/format'

type LoaderData = {
  calorieLog: CalorieLog
}

export const loader: LoaderFunction = async ({request, params}) => {
  const userId = await requireUserId(request)
  invariant(params.logId, 'logId not found')

  const calorieLog = await getLog({userId, id: params.logId})
  if (!calorieLog) {
    throw new Response('Not Found', {status: 404})
  }
  return json<LoaderData>({calorieLog})
}

export const action: ActionFunction = async ({request, params}) => {
  const userId = await requireUserId(request)
  invariant(params.logId, 'logId not found')

  await deleteCalorieLog({userId, id: params.logId})

  return redirect('/calorie-logs')
}

export default function CalorieLogDetailsPage() {
  const data = useLoaderData() as LoaderData

  return (
    <div>
      <h3 className="text-2xl font-bold">
        Log {format(new Date(data.calorieLog.date), 'dd-MM-yyyy')}
      </h3>
      <p className="py-6">{data.calorieLog.calories}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  )
}

export function ErrorBoundary({error}: {error: Error}) {
  console.error(error)

  return <div>An unexpected error occurred: {error.message}</div>
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div>Note not found</div>
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}
