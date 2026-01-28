const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
})

export const formatCurrency = (amount: number) => currencyFormatter.format(amount)

export const formatPercent = (value: number) => percentFormatter.format(value)

export const formatDate = (isoDate: string) =>
  dateFormatter.format(new Date(`${isoDate}T00:00:00Z`))

export const formatMonth = (monthKey: string) =>
  monthFormatter.format(new Date(`${monthKey}-01T00:00:00Z`))
