import { useMemo, useState } from 'react';

export default function LoveMeter() {
  const [count, setCount] = useState(100);
  const [isInfinite, setIsInfinite] = useState(false);

  const label = useMemo(() => {
    if (isInfinite) return '∞';
    return `${count}%`;
  }, [count, isInfinite]);

  const nextValue = () => {
    if (isInfinite) return;

    if (count >= 5000) {
      setIsInfinite(true);
      return;
    }

    const next = count === 100 ? 200 : count === 200 ? 500 : count === 500 ? 1000 : count === 1000 ? 5000 : 100000;
    setCount(next);
  };

  return (
    <div className="love-meter-wrap">
      <div className="big-number">{label}</div>
      <div className="love-meter" aria-label="Love meter">
        <div
          className="love-meter__fill"
          style={{ width: isInfinite ? '100%' : `${Math.min(count, 100)}%` }}
        />
      </div>

      <div className="button-row">
        <button type="button" className="cute-button" onClick={nextValue}>
          Add more love ❤️
        </button>
      </div>

      {isInfinite && (
        <div className="quote-block">
          <p>Okay… you broke the meter. 😭❤️</p>
          <p>I told you my love doesn't have a limit.</p>
        </div>
      )}
    </div>
  );
}
