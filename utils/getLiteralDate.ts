import dayjs from 'dayjs'

function getLiteralDate(date, { withTime = false }) {
  const literalDates = {
    near: ['Вчера', 'Сегодня', 'Завтра'],
    past: [
      'В прошлое воскресенье',
      'В прошлый понедельник',
      'В прошлый вторник',
      'В прошлую среду',
      'В прошлый четверг',
      'В прошлую пятницу',
      'В прошлую субботу',
    ],
    future: [
      'В воскресенье',
      'В понедельник',
      'Во вторник',
      'В среду',
      'В четверг',
      'В пятницу',
      'В субботу',
    ],
  }
  const time = withTime ? ' в ' + date.format('HH:mm') : ''
  const now = dayjs()
  const delta = Math.ceil(date.diff(now, 'day', true))
  if (delta >= -1 && delta <= 1) {
    return literalDates.near[delta + 1] + time
  }
  if (delta < 0 && delta > -7) {
    return literalDates.past[date.day()] + time
  }
  if (delta > 0 && delta < 7) {
    return literalDates.future[date.day()] + time
  }
  return date.format('D MMM') + time
}

export default getLiteralDate
