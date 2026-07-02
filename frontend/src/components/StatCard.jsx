function StatCard({ label, value, icon, iconBg, iconColor, trendText, trendColor }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {trendText && (
          <p className="stat-trend" style={{ color: trendColor }}>
            {trendText} ↗
          </p>
        )}
      </div>
    </div>
  );
}

export default StatCard;