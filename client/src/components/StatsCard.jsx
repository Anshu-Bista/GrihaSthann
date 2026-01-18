import "./StatsCard.css";

export default function StatsCard({ title, value, icon, subicon, subtitle}) {
    return (
      <div className="stats-card">
        {/* Image */}
        <div className="image-stack">
            <div className="main-circle">
                <img src={icon} alt = ""/>
            </div>
            <div className="sub-circle">
              
                <img src={subicon} alt = ""/>
            </div>
        </div>
        <div className="stats-text">
            <div className="stats-line">
                <span className="stats-value">{value}</span>
                <span className="stats-title">{title}</span>
            </div>
            <span className="stats-subtitle">{subtitle}</span>
        </div>
      </div>
    );
  }
  