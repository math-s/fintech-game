export type InstallmentStatus = 'scheduled' | 'paid' | 'missed' | 'defaulted'

export type RiskProfile = {
  creditRisk: number
  fraudRisk: number
}

export type Installment = {
  id: string
  sequence: number
  dueDate: string
  amount: number
  status: InstallmentStatus
}

export type Loan = {
  id: string
  borrowerName: string
  principal: number
  apr: number
  installmentsCount: number
  installmentAmount: number
  issuedDate: string
  firstDueDate: string
  risk: RiskProfile
  installments: Installment[]
}

export type BorrowerOffer = {
  id: string
  name: string
  amount: number
  apr: number
  installmentsCount: number
  firstDueDate: string
  risk: RiskProfile
}

export type GameState = {
  day: number
  date: string
  cash: number
  baseRate: number
  loans: Loan[]
}

export type ReceivableBucket = {
  monthKey: string
  expected: number
  atRisk: number
  installments: number
}
