import { Hours } from '@/lib/types'

type weekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

interface Props {
  isActive: boolean
  onClick: () => void
  weekDay: weekDay
  startTime?: number
  endTime?: number
}

export default function WeekdayButton({
  isActive,
  onClick,
  weekDay,
  startTime,
  endTime,
}: Props) {
  return (
    <div className="mb-3 flex items-stretch gap-2">
      <button
        type="button"
        onClick={onClick}
        className={`w-28 rounded-lg border-2 ${isActive && 'bg-blue-500 text-white'}`}
      >
        {weekDay.charAt(0).toUpperCase().concat(weekDay.slice(1))}
      </button>
      <select
        defaultValue={startTime}
        disabled={!isActive}
        name={`${weekDay}StartAt`}
        className="flex-1 rounded-lg border border-b-2 bg-slate-200 p-2 font-medium text-blue-600 disabled:bg-white disabled:text-neutral-500"
      >
        <option value="" selected disabled>
          Start at
        </option>
        {Hours.map((hour) => (
          <option value={hour.value}>{hour.label}</option>
        ))}
      </select>
      <select
        defaultValue={endTime}
        disabled={!isActive}
        name={`${weekDay}EndAt`}
        className="flex-1 rounded-lg border border-b-2 bg-slate-200 p-2 font-medium text-blue-600 disabled:bg-white disabled:text-neutral-500"
      >
        <option value="" selected disabled>
          End at
        </option>
        {Hours.map((hour) => (
          <option value={hour.value}>{hour.label}</option>
        ))}
      </select>
    </div>
  )
}
