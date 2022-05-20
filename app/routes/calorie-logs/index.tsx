import {Link} from '@remix-run/react'

export default function NoteIndexPage() {
  return (
    <p>
      No log selected. Select a log from the left, or{' '}
      <Link to="new" className="text-blue-500 underline">
        create a submit a log.
      </Link>
    </p>
  )
}
