import type {ActionFunction} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'
import {Form, useActionData} from '@remix-run/react'
import * as React from 'react'

import {createLog} from '~/models/calorie-log.server'
import {requireUserId} from '~/session.server'

type ActionData = {
  errors?: {
    calories?: string
    comment?: string
  }
}

export const action: ActionFunction = async ({request}) => {
  const userId = await requireUserId(request)

  const formData = await request.formData()
  const calories = formData.get('calories')
  const comment = formData.get('comment')

  if (typeof calories !== 'string') {
    return json<ActionData>(
      {errors: {calories: 'Calories field is required'}},
      {status: 400}
    )
  }

  const caloriesNum = parseInt(calories)

  if (isNaN(caloriesNum) || caloriesNum < 200) {
    return json<ActionData>(
      {errors: {calories: 'Calories must be a number over 200'}},
      {status: 400}
    )
  }

  if (typeof comment !== 'string' && comment) {
    return json<ActionData>(
      {errors: {comment: 'Comment must be a string'}},
      {status: 400}
    )
  }

  const note = await createLog({calories: caloriesNum, comment, userId})

  return redirect(`/calorie-log/${note.id}`)
}

export default function NewCalorieLogPage() {
  const actionData = useActionData() as ActionData
  const calorieRef = React.useRef<HTMLInputElement>(null)
  const commentRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (actionData?.errors?.calories) {
      calorieRef.current?.focus()
    } else if (actionData?.errors?.comment) {
      commentRef.current?.focus()
    }
  }, [actionData])

  return (
    <Form
      method="post"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Calories: </span>
          <input
            ref={calorieRef}
            name="calories"
            type={'number'}
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.calories ? true : undefined}
            aria-errormessage={
              actionData?.errors?.calories ? 'calories-error' : undefined
            }
          />
        </label>
        {actionData?.errors?.calories && (
          <div className="pt-1 text-red-700" id="calories-error">
            {actionData.errors.calories}
          </div>
        )}
      </div>

      {/* Form with a calendar*/}
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Comment (anything to add about this day): </span>
          <textarea
            ref={commentRef}
            name="comment"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            aria-invalid={actionData?.errors?.comment ? true : undefined}
            aria-errormessage={
              actionData?.errors?.comment ? 'comment-error' : undefined
            }
          />
        </label>
        {actionData?.errors?.comment && (
          <div className="pt-1 text-red-700" id="comment-error">
            {actionData.errors.comment}
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  )
}
