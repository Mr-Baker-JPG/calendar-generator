import { always, compose, curry, filter, flip, identity, ifElse, map, not, unfold } from "ramda"
import {
  startOfWeek,
  startOfMonth,
  addDays,
  format,
  getWeeksInMonth,
  isWeekend
} from "date-fns"

// Helpers
const seed = size => n => n >= size ? false : [n, n + 1];
const genArray = size => unfold(seed(size), 0); 
const isWeekday = compose(not, isWeekend)
const getDatesOfWeek = thisWeekStart => compose(map(_addDays(thisWeekStart)), genArray)
const _addDays = curry(addDays)

export function generateWeek(date = new Date(), { includeWeekends = true, weekStartsOn = 0 } = {}) {
  let currStartOfWeek = startOfWeek(date, {weekStartsOn})
  return () => {
    const thisWeekStart = new Date(currStartOfWeek)
    const daysInWeek = 7
    currStartOfWeek = addDays(currStartOfWeek, 7)
    return ifElse(
      always(includeWeekends),
      identity,
      filter(isWeekday)
    )(getDatesOfWeek(thisWeekStart)(daysInWeek))
  }
}

export function generateMonth(date = new Date(), { includeWeekends = true, weekStartsOn = 0 } = {}) {
  const currStartOfMonth = compose(flip(startOfWeek)({weekStartsOn}), startOfMonth)(date)
  const month = Array(getWeeksInMonth(date)).fill([])
  return () => {
    const thisMonthStart = new Date(currStartOfMonth)
    const weekGenerator = generateWeek(thisMonthStart, {includeWeekends, weekStartsOn})
    return month.map(weekGenerator)
  }
}

export function getWeekdays ({ weekStartsOn = 0, formatType = "long", includeWeekends = true } = {}) {
  const formatString =
    formatType === "long"
      ? "eeee"
      : formatType === "short"
      ? "eee"
      : formatType === "shortest"
      ? "eeeee"
      : "eeee"
  const weekStart = startOfWeek(new Date(), {weekStartsOn})
  const firstDayOfWeek = startOfWeek(weekStart, { weekStartsOn: weekStartsOn || 0 })
  const daysInWeek = 7

  
  return genArray(daysInWeek)
    .reduce((days, curr) => {
      const date = addDays(firstDayOfWeek, curr)
      if (!includeWeekends && isWeekend(date)) {
        return days
      }
      return [...days, format(date, formatString)]
    }, [])
}