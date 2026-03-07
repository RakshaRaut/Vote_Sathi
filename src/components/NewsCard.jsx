function NewsCard({ tagClass, tagLabel, claim, verdict, source }) {
  return (
    <div className="fact-card">
      <div className={`fact-tag ${tagClass}`}>{tagLabel}</div>

      <div className="fact-claim">{claim}</div>

      <div className="fact-verdict">{verdict}</div>

      <div className="fact-source">{source}</div>
    </div>
  );
}

export default NewsCard;