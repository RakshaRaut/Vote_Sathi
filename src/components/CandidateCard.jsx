function CandidateCard({ name, party, percent, color, initials, barWidth }) {
  return (
    <div className="candidate-row" role="listitem">
      <div
        className="cand-avatar"
        style={{ background: `${color}20`, color: color }}
      >
        {initials}
      </div>

      <div className="cand-info">
        <div className="cand-name">{name}</div>
        <div className="cand-party">{party}</div>
      </div>

      <div className="cand-bar-wrap">
        <div className="cand-bar-bg">
          <div
            className="cand-bar"
            style={{ width: `${barWidth}%`, background: color }}
          />
        </div>
        <div className="cand-pct" style={{ color: color }}>
          {percent}%
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;