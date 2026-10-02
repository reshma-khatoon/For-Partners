export default function MemoryCard({ image, caption }) {
  return (
    <article className="memory-card">
      <img src={image} alt={caption} width="400" height="500" loading="lazy" decoding="async" />
      <p>{caption}</p>
    </article>
  );
}
