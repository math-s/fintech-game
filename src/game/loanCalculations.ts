import type { Installment, InstallmentStatus, Loan } from './types'

const openStatuses: InstallmentStatus[] = ['scheduled', 'missed']

export const isInstallmentOpen = (installment: Installment) =>
  openStatuses.includes(installment.status)

export const getOpenInstallments = (loan: Loan, asOfDate?: string) => {
  const openInstallments = loan.installments.filter(isInstallmentOpen)
  const filtered = asOfDate
    ? openInstallments.filter((installment) => installment.dueDate >= asOfDate)
    : openInstallments
  return filtered.sort((a, b) => a.dueDate.localeCompare(b.dueDate))
}

export const getNextInstallment = (loan: Loan, asOfDate: string) => {
  const upcoming = getOpenInstallments(loan, asOfDate)
  if (upcoming.length > 0) {
    return upcoming[0]
  }
  const open = getOpenInstallments(loan)
  return open[0] ?? null
}

export const getOutstandingBalance = (loan: Loan) =>
  getOpenInstallments(loan).reduce((sum, installment) => sum + installment.amount, 0)

export const getCombinedRisk = (loan: Loan) =>
  1 - (1 - loan.risk.creditRisk) * (1 - loan.risk.fraudRisk)
