import type { GameState, Installment, Loan, RiskProfile } from './types'

const toIsoDate = (date: Date) => date.toISOString().slice(0, 10)

const addMonths = (isoDate: string, months: number) => {
  const date = new Date(`${isoDate}T00:00:00Z`)
  date.setUTCMonth(date.getUTCMonth() + months)
  return toIsoDate(date)
}

const roundToCents = (value: number) => Math.round(value * 100) / 100

const calculateInstallmentAmount = (
  principal: number,
  apr: number,
  installmentsCount: number
) => {
  const monthlyRate = apr / 12
  if (monthlyRate === 0) {
    return principal / installmentsCount
  }
  const factor = Math.pow(1 + monthlyRate, installmentsCount)
  return principal * ((monthlyRate * factor) / (factor - 1))
}

const buildInstallments = (
  loanId: string,
  firstDueDate: string,
  installmentsCount: number,
  amount: number,
  paidCount: number
): Installment[] =>
  Array.from({ length: installmentsCount }, (_, index) => {
    const sequence = index + 1
    return {
      id: `${loanId}-inst-${sequence}`,
      sequence,
      dueDate: addMonths(firstDueDate, index),
      amount,
      status: sequence <= paidCount ? 'paid' : 'scheduled',
    }
  })

type LoanInput = {
  id: string
  borrowerName: string
  principal: number
  apr: number
  installmentsCount: number
  issuedDate: string
  firstDueDate: string
  risk: RiskProfile
  paidInstallments: number
}

const createLoan = ({
  id,
  borrowerName,
  principal,
  apr,
  installmentsCount,
  issuedDate,
  firstDueDate,
  risk,
  paidInstallments,
}: LoanInput): Loan => {
  const installmentAmount = roundToCents(
    calculateInstallmentAmount(principal, apr, installmentsCount)
  )
  return {
    id,
    borrowerName,
    principal,
    apr,
    installmentsCount,
    installmentAmount,
    issuedDate,
    firstDueDate,
    risk,
    installments: buildInstallments(
      id,
      firstDueDate,
      installmentsCount,
      installmentAmount,
      paidInstallments
    ),
  }
}

const loans: Loan[] = [
  createLoan({
    id: 'loan-olive',
    borrowerName: 'Olive Market',
    principal: 5200,
    apr: 0.18,
    installmentsCount: 12,
    issuedDate: '2025-12-15',
    firstDueDate: '2026-01-15',
    risk: { creditRisk: 0.12, fraudRisk: 0.02 },
    paidInstallments: 0,
  }),
  createLoan({
    id: 'loan-northside',
    borrowerName: 'Northside Repairs',
    principal: 2200,
    apr: 0.28,
    installmentsCount: 6,
    issuedDate: '2026-01-10',
    firstDueDate: '2026-02-10',
    risk: { creditRisk: 0.25, fraudRisk: 0.07 },
    paidInstallments: 0,
  }),
  createLoan({
    id: 'loan-lighthouse',
    borrowerName: 'Lighthouse Cafe',
    principal: 9000,
    apr: 0.12,
    installmentsCount: 24,
    issuedDate: '2025-08-01',
    firstDueDate: '2025-09-01',
    risk: { creditRisk: 0.08, fraudRisk: 0.01 },
    paidInstallments: 5,
  }),
]

export const sampleState: GameState = {
  day: 120,
  date: '2026-01-28',
  cash: 14250,
  baseRate: 0.045,
  loans,
}
