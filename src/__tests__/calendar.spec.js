import { generateWeek, generateMonth, getWeekdays } from "../index"
import { toDate } from "date-fns"

describe('generateWeek', () => {
  it('should create a week generator that generates weeks each time it is run', () => {
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
  });

  it('should generate weekdays only', () => {
    const startDate = new Date("April 6, 2021")
    const includeWeekends = false
    const weekdayGenerator = generateWeek(startDate, {includeWeekends})
    const week = weekdayGenerator()

    expect(week).toHaveLength(5)
    expect(week).toStrictEqual([
      toDate(new Date("April 5, 2021")),
      toDate(new Date("April 6, 2021")),
      toDate(new Date("April 7, 2021")),
      toDate(new Date("April 8, 2021")),
      toDate(new Date("April 9, 2021")),
    ])

    const nextWeek = weekdayGenerator()

    expect(nextWeek).toHaveLength(5)
    expect(nextWeek).toStrictEqual([
      toDate(new Date("April 12, 2021")),
      toDate(new Date("April 13, 2021")),
      toDate(new Date("April 14, 2021")),
      toDate(new Date("April 15, 2021")),
      toDate(new Date("April 16, 2021")),
    ])
  });

  it('should set the start of the week', () => {
    const startDate = new Date("April 6, 2021")
    const weekGenerator = generateWeek(startDate, {weekStartsOn: 1})
    const week = weekGenerator()

    expect(week).toHaveLength(7)
    expect(week).toStrictEqual([
      toDate(new Date("April 5, 2021")),
      toDate(new Date("April 6, 2021")),
      toDate(new Date("April 7, 2021")),
      toDate(new Date("April 8, 2021")),
      toDate(new Date("April 9, 2021")),
      toDate(new Date("April 10, 2021")),
      toDate(new Date("April 11, 2021")),
    ])

    const nextWeek = weekGenerator()

    expect(nextWeek).toHaveLength(7)
    expect(nextWeek).toStrictEqual([
      toDate(new Date("April 12, 2021")),
      toDate(new Date("April 13, 2021")),
      toDate(new Date("April 14, 2021")),
      toDate(new Date("April 15, 2021")),
      toDate(new Date("April 16, 2021")),
      toDate(new Date("April 17, 2021")),
      toDate(new Date("April 18, 2021")),
    ])    
  });
})

describe("generateMonth", () => {
  it("should create a month generator that generates months each time it is run", () => {
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

  it('should generate a month with only weekdays', () => {
    const startDate = new Date("April 10, 2021")
    const includeWeekends = false
    const monthGenerator = generateMonth(startDate, {includeWeekends})
  
    const month = monthGenerator()
  
    expect(month).toHaveLength(5)
    expect(month[0]).toStrictEqual([
      toDate(new Date("March 29, 2021")),
      toDate(new Date("March 30, 2021")),
      toDate(new Date("March 31, 2021")),
      toDate(new Date("April 1, 2021")),
      toDate(new Date("April 2, 2021")),
    ])
    expect(month[4]).toStrictEqual([
      toDate(new Date("April 26, 2021")),
      toDate(new Date("April 27, 2021")),
      toDate(new Date("April 28, 2021")),
      toDate(new Date("April 29, 2021")),
      toDate(new Date("April 30, 2021")),
    ])
  });
  
  it('should generate a month with different start of weekday', () => {
    const startDate = new Date("April 10, 2021")
    const monthGenerator = generateMonth(startDate, {weekStartsOn: 1})
  
    const month = monthGenerator()
  
    expect(month).toHaveLength(5)
    expect(month[0]).toStrictEqual([
      toDate(new Date("March 29, 2021")),
      toDate(new Date("March 30, 2021")),
      toDate(new Date("March 31, 2021")),
      toDate(new Date("April 1, 2021")),
      toDate(new Date("April 2, 2021")),
      toDate(new Date("April 3, 2021")),
      toDate(new Date("April 4, 2021")),
    ])
    expect(month[4]).toStrictEqual([
      toDate(new Date("April 26, 2021")),
      toDate(new Date("April 27, 2021")),
      toDate(new Date("April 28, 2021")),
      toDate(new Date("April 29, 2021")),
      toDate(new Date("April 30, 2021")),
      toDate(new Date("May 1, 2021")),
      toDate(new Date("May 2, 2021")),
    ])
  });

  it('should be able to return a single array of the dates', () => {
    const startDate = new Date("April 10, 2021")
    const asMatrix = false
    const monthGenerator = generateMonth(startDate, {asMatrix})
  
    const month = monthGenerator()
    expect(month).toHaveLength(35)
    expect(month).toContainEqual(toDate(new Date("May 1, 2021")))
    expect(month).toContainEqual(toDate(new Date("March 31, 2021")))
    expect(month).toContainEqual(toDate(new Date("April 2, 2021")))
    expect(month).toContainEqual(toDate(new Date("April 21, 2021")))
  });
})

describe("getWeekdays", () => {
  it('should return the weekdays in long form', () => {
    const weekdays = getWeekdays()
    expect(weekdays).toStrictEqual([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ])
  });
  it('should return the weekdays in short form', () => {
    const weekdays = getWeekdays({formatType: 'short'})
    expect(weekdays).toStrictEqual([
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ])

  });
  it('should return the weekdays in first letter form', () => {
    const weekdays = getWeekdays({formatType: 'shortest'})
    expect(weekdays).toStrictEqual([
      "S",
      "M",
      "T",
      "W",
      "T",
      "F",
      "S"
    ])
  });
  it('should return the weekdays starting with different first day', () => {
    const weekdays = getWeekdays({weekStartsOn: 1})
    expect(weekdays).toStrictEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
  });
  it('should return weekdays without weekends', () => {
    const weekdays = getWeekdays({includeWeekends: false})
    expect(weekdays).toStrictEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ])
  });

})