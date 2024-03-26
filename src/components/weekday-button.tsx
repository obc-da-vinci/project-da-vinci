import { Hours, WeekDay } from '@/lib/types'
import { Select, SelectItem } from '@nextui-org/react'

interface Props {
  isActive: boolean
  onClick: () => void
  weekDay: WeekDay
  handleToggleDay: (day: WeekDay) => void
  handleTimeChange: ({
    day,
    startAt,
    endAt,
  }: {
    day: WeekDay
    startAt?: number
    endAt?: number
  }) => void
}

export default function WeekdayButton({
  isActive,
  onClick,
  weekDay,
  handleToggleDay,
  handleTimeChange,
}: Props) {
  const weekDayMapping = (weekDay: WeekDay) => {
    const map = {
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
    }
    return map[weekDay]
  }

  const handleClick = () => {
    onClick()
    handleToggleDay(weekDay)
  }

  return (
    <div className="mb-3 flex items-stretch gap-2">
      <button
        type="button"
        onClick={handleClick}
        className={`w-28 rounded-lg border-2 ${isActive && 'bg-blue-500 text-white'}`}
      >
        {weekDayMapping(weekDay)}
      </button>
      <Select
        onChange={(e) =>
          handleTimeChange({
            day: weekDay,
            startAt: parseFloat(e.target.value),
          })
        }
        label="Start at"
        className="flex-1 font-medium"
        variant="bordered"
        isDisabled={!isActive}
      >
        {Hours.map((hour) => (
          <SelectItem key={hour.value} value={hour.value}>
            {hour.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        onChange={(e) =>
          handleTimeChange({ day: weekDay, endAt: parseFloat(e.target.value) })
        }
        label="End at"
        className="flex-1 font-medium"
        variant="bordered"
        isDisabled={!isActive}
      >
        {Hours.map((hour) => (
          <SelectItem key={hour.value} value={hour.value}>
            {hour.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
