import React from "react";

function DashboardCards({ cards = [] }) {
  if (!cards.length) {
    return <div className="sa-empty">No dashboard metrics available.</div>;
  }

  return (
    <div className="sa-card-grid">
      {cards.map(({ label, value, icon: Icon, tone }) => (
        <div className="sa-stat-card" key={label}>
          <div className={`sa-stat-icon sa-stat-icon--${tone || "teal"}`}>
            {Icon ? <Icon size={18} /> : null}
          </div>
          <div>
            <h2>{value}</h2>
            <p>{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;

