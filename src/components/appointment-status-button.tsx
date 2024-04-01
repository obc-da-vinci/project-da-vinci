'use client'

interface Props {
  status: 'ACCEPT' | 'REJECTED'
}

export default function ButtonAppointmentStatus({ status }: Props) {
  switch (status) {
    case 'ACCEPT':
      return (
        <button
          onClick={() => alert('implement')}
          className="w-full rounded-lg border bg-blue-500 p-2 font-medium text-white"
        >
          Accept
        </button>
      )
    case 'REJECTED':
      return (
        <button
          onClick={() => alert('implement')}
          className="w-full rounded-lg border bg-yellow-500 p-2 font-medium text-white"
        >
          Rejected
        </button>
      )
    default:
  }
}
