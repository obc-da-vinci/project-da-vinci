'use client'

import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-lg font-medium">
        Oops! Looks like something went wrong...
      </h1>
      <Link
        href="/"
        className="mt-5 rounded-xl bg-blue-500 p-2 px-5 text-white"
      >
        Return to homepage
      </Link>
    </div>
  )
}
