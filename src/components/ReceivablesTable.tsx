import { ReceivableBucket } from '../game/types'
import { formatCurrency, formatMonth, formatPercent } from '../game/format'

type ReceivablesTableProps = {
  rows: ReceivableBucket[]
}

const ReceivablesTable = ({ rows }: ReceivablesTableProps) => {
  if (rows.length === 0) {
    return <p className="muted">No upcoming receivables yet.</p>
  }

  return (
    <div className="receivables">
      <table className="receivables-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Installments</th>
            <th>Expected</th>
            <th>At risk</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const ratio = row.expected === 0 ? 0 : row.atRisk / row.expected
            return (
              <tr key={row.monthKey}>
                <td>{formatMonth(row.monthKey)}</td>
                <td>{row.installments}</td>
                <td>{formatCurrency(row.expected)}</td>
                <td>{formatCurrency(row.atRisk)}</td>
                <td className="risk-cell">
                  <span>{formatPercent(ratio)}</span>
                  <div className="risk-bar">
                    <span style={{ width: `${Math.round(ratio * 100)}%` }} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ReceivablesTable
