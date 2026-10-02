export default function LoveCard({ emoji, title, text }) {
  return (
    <article className="love-card">
      <div className="kicker">{emoji}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
