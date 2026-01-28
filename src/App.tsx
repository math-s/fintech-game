import './App.css'
import LoanList from './components/LoanList'
import ReceivablesTable from './components/ReceivablesTable'
import StatCard from './components/StatCard'
import { formatCurrency, formatDate, formatPercent } from './game/format'
import { getOutstandingBalance } from './game/loanCalculations'
import { buildReceivables } from './game/receivables'
import { sampleState } from './game/sampleState'

function App() {
  const { date, day, cash, baseRate, loans } = sampleState
  const receivables = buildReceivables(loans, date)
  const upcomingReceivables = receivables.slice(0, 6)
  const totalOutstanding = loans.reduce(
    (sum, loan) => sum + getOutstandingBalance(loan),
    0
  )
  const nextQuarter = receivables.slice(0, 3)
  const nextQuarterExpected = nextQuarter.reduce(
    (sum, row) => sum + row.expected,
    0
  )
  const nextQuarterAtRisk = nextQuarter.reduce(
    (sum, row) => sum + row.atRisk,
    0
  )
  const upcomingTotal = upcomingReceivables.reduce(
    (sum, row) => sum + row.expected,
    0
  )

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="kicker">Credit Operations Simulator</p>
          <h1>Fintech Lending Desk</h1>
          <p className="muted">
            Manage cash, price risk, and keep the receivables flowing.
          </p>
        </div>
        <div className="status-chip">Day {day}</div>
      </header>

      <section className="stats-grid">
        <StatCard label="Cash" value={formatCurrency(cash)} helper="Available to lend" />
        <StatCard
          label="Base rate"
          value={formatPercent(baseRate)}
          helper="Next change in 3 months"
        />
        <StatCard
          label="Loans outstanding"
          value={formatCurrency(totalOutstanding)}
          helper={`${loans.length} active loans`}
        />
        <StatCard
          label="Next 3 months"
          value={formatCurrency(nextQuarterExpected)}
          helper={`${formatCurrency(nextQuarterAtRisk)} at risk`}
        />
        <StatCard label="Game date" value={formatDate(date)} helper="Daily time step" />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Receivables forecast</h2>
            <p className="muted">
              Expected installments by month, with risk-weighted exposure.
            </p>
          </div>
          <div className="panel-summary">
            <span className="label">Next 6 months</span>
            <span className="value">{formatCurrency(upcomingTotal)}</span>
          </div>
        </div>
        <ReceivablesTable rows={upcomingReceivables} />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Active loans</h2>
            <p className="muted">
              Each loan carries its own terms, installment plan, and risk.
            </p>
          </div>
        </div>
        <LoanList loans={loans} asOfDate={date} />
      </section>

      <section className="panel">
        <h2>Next build steps</h2>
        <ul className="bullets">
          <li>Randomize new borrower offers each month.</li>
          <li>Advance time and resolve installment payments.</li>
          <li>Track bank funding lines and interest costs.</li>
        </ul>
      </section>
    </div>
  )
}

export default App
