type StatCardProps = {
  label: string
  value: string
  helper?: string
}

const StatCard = ({ label, value, helper }: StatCardProps) => (
  <div className="stat-card">
    <span className="stat-label">{label}</span>
    <div className="stat-value">{value}</div>
    {helper ? <div className="stat-helper">{helper}</div> : null}
  </div>
)

export default StatCard
