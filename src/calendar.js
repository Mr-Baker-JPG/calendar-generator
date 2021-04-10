import { compose } from "ramda"
import {
  startOfWeek,
  startOfMonth,
  addDays,
  getWeeksInMonth
} from "date-fns"

export function generateWeek(date = new Date()) {
  let currStartOfWeek = startOfWeek(date)
  return () => {
    const thisWeekStart = new Date(currStartOfWeek)
    currStartOfWeek = addDays(currStartOfWeek, 7)
    return new Array(7).fill(0).map((_, i) => addDays(thisWeekStart, 1 + i - 1))
  }
}

export function generateMonth(date = new Date()) {
  const currStartOfMonth = compose(startOfWeek, startOfMonth)(date)
  const month = Array(getWeeksInMonth(date)).fill([])
  return () => {
    const thisMonthStart = new Date(currStartOfMonth)
    const weekGenerator = generateWeek(thisMonthStart)
    return month.map(weekGenerator)
  }
}
