import { Loan } from '../game/types'
import {
  getCombinedRisk,
  getNextInstallment,
  getOpenInstallments,
  getOutstandingBalance,
} from '../game/loanCalculations'
import { formatCurrency, formatDate, formatPercent } from '../game/format'

type LoanListProps = {
  loans: Loan[]
  asOfDate: string
}

const LoanList = ({ loans, asOfDate }: LoanListProps) => {
  if (loans.length === 0) {
    return <p className="muted">No active loans yet.</p>
  }

  return (
    <div className="loan-grid">
      {loans.map((loan) => {
        const nextInstallment = getNextInstallment(loan, asOfDate)
        const openInstallments = getOpenInstallments(loan)
        const outstanding = getOutstandingBalance(loan)
        const risk = getCombinedRisk(loan)
        return (
          <article className="loan-card" key={loan.id}>
            <header className="loan-card-header">
              <div>
                <p className="loan-name">{loan.borrowerName}</p>
                <p className="loan-subtle">Issued {formatDate(loan.issuedDate)}</p>
              </div>
              <span className="pill">{formatPercent(risk)} risk</span>
            </header>
            <div className="loan-metrics">
              <div>
                <span className="label">Outstanding</span>
                <div className="value">{formatCurrency(outstanding)}</div>
              </div>
              <div>
                <span className="label">Installment</span>
                <div className="value">{formatCurrency(loan.installmentAmount)}</div>
              </div>
            </div>
            <div className="loan-metrics">
              <div>
                <span className="label">APR</span>
                <div className="value">{formatPercent(loan.apr)}</div>
              </div>
              <div>
                <span className="label">Payments left</span>
                <div className="value">{openInstallments.length}</div>
              </div>
            </div>
            <div className="loan-metrics">
              <div>
                <span className="label">Next due</span>
                <div className="value">
                  {nextInstallment ? formatDate(nextInstallment.dueDate) : 'Paid off'}
                </div>
              </div>
              <div>
                <span className="label">Status</span>
                <div className="value">
                  {openInstallments.length ? 'Active' : 'Complete'}
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default LoanList
