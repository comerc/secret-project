import type { NextApiRequest, NextApiResponse } from 'next'

const DateDiff = {
  inDays: function (d1: Date, d2: Date) {
    const t2 = d2.getTime()
    const t1 = d1.getTime()
    return Math.floor((t2 - t1) / (24 * 3600 * 1000))
  },
  inWeeks: function (d1: Date, d2: Date) {
    const t2 = d2.getTime()
    const t1 = d1.getTime()
    return parseInt('' + (t2 - t1) / (24 * 3600 * 1000 * 7))
  },
  inMonths: function (d1: Date, d2: Date) {
    const d1Y = d1.getFullYear()
    const d2Y = d2.getFullYear()
    const d1M = d1.getMonth()
    const d2M = d2.getMonth()
    return d2M + 12 * d2Y - (d1M + 12 * d1Y)
  },
  inYears: function (d1: Date, d2: Date) {
    return d2.getFullYear() - d1.getFullYear()
  },
}

type Data = {
  data: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const dString = 'Apr, 2, 2023'
  const final = new Date(dString)
  const now = new Date()
  const diff = DateDiff.inDays(final, now)
  const data = {
    final,
    now,
    diff,
  }
  res.status(200).json(data)
}
