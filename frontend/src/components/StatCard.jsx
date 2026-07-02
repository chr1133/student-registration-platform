function StatCard({ label, value, icon, color }) {
  return (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <div className="stat-icon">{icon}</div>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;