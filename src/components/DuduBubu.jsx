export default function DuduBubu({ gif = 'hug.gif', mood = 'love', size = 'medium', className = '' }) {
  const src = `/gifs/dudu-bubu/${gif}`;

  return (
    <div className={`dudu-bubu ${size} ${className}`.trim()}>
      <img src={src} alt="Dudu and Bubu" fetchPriority="high" decoding="async" />
      <div className="dudu-bubu__label">{mood}</div>
    </div>
  );
}
