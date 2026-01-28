import type { Loan, ReceivableBucket } from './types'
import { getCombinedRisk, getOpenInstallments } from './loanCalculations'

export const buildReceivables = (loans: Loan[], asOfDate: string) => {
  const buckets = new Map<string, ReceivableBucket>()

  loans.forEach((loan) => {
    const risk = getCombinedRisk(loan)
    const installments = getOpenInstallments(loan, asOfDate)
    installments.forEach((installment) => {
      const monthKey = installment.dueDate.slice(0, 7)
      const existing = buckets.get(monthKey)
      const next: ReceivableBucket = existing ?? {
        monthKey,
        expected: 0,
        atRisk: 0,
        installments: 0,
      }
      next.expected += installment.amount
      next.atRisk += installment.amount * risk
      next.installments += 1
      buckets.set(monthKey, next)
    })
  })

  return Array.from(buckets.values()).sort((a, b) =>
    a.monthKey.localeCompare(b.monthKey)
  )
}
