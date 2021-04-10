import { toDate } from "date-fns"
import { generateWeek, generateMonth } from "../index"

test("generate week", () => {
  const startDate = new Date("April 6, 2021")
  const weekGenerator = generateWeek(startDate)
  const week = weekGenerator()

  expect(week).toHaveLength(7)
  expect(week).toStrictEqual([
    toDate(new Date("April 4, 2021")),
    toDate(new Date("April 5, 2021")),
    toDate(new Date("April 6, 2021")),
    toDate(new Date("April 7, 2021")),
    toDate(new Date("April 8, 2021")),
    toDate(new Date("April 9, 2021")),
    toDate(new Date("April 10, 2021")),
  ])

  const nextWeek = weekGenerator()

  expect(nextWeek).toHaveLength(7)
  expect(nextWeek).toStrictEqual([
    toDate(new Date("April 11, 2021")),
    toDate(new Date("April 12, 2021")),
    toDate(new Date("April 13, 2021")),
    toDate(new Date("April 14, 2021")),
    toDate(new Date("April 15, 2021")),
    toDate(new Date("April 16, 2021")),
    toDate(new Date("April 17, 2021")),
  ])
})

test("generate month", () => {
  const startDate = new Date("April 10, 2021")
  const monthGenerator = generateMonth(startDate)

  const month = monthGenerator()

  expect(month).toHaveLength(5)
  expect(month[0]).toStrictEqual([
    toDate(new Date("March 28, 2021")),
    toDate(new Date("March 29, 2021")),
    toDate(new Date("March 30, 2021")),
    toDate(new Date("March 31, 2021")),
    toDate(new Date("April 1, 2021")),
    toDate(new Date("April 2, 2021")),
    toDate(new Date("April 3, 2021")),
  ])
  expect(month[4]).toStrictEqual([
    toDate(new Date("April 25, 2021")),
    toDate(new Date("April 26, 2021")),
    toDate(new Date("April 27, 2021")),
    toDate(new Date("April 28, 2021")),
    toDate(new Date("April 29, 2021")),
    toDate(new Date("April 30, 2021")),
    toDate(new Date("May 1, 2021")),
  ])
})
