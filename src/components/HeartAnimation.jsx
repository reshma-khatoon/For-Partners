export default function HeartAnimation({ active = true }) {
  if (!active) return null;

  const particles = Array.from({ length: 14 }, (_, index) => ({
    id: index,
    left: `${(index * 7) % 100}%`,
    delay: `${(index * 0.22).toFixed(2)}s`,
    duration: `${(2.8 + (index % 4) * 0.5).toFixed(2)}s`,
    size: `${0.9 + (index % 5) * 0.2}rem`,
  }));

  return (
    <div className="hearts" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="heart-particle"
          style={{
            left: particle.left,
            bottom: `${15 + (particle.id % 6) * 10}px`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            fontSize: particle.size,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
