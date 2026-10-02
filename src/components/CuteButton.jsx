import { Link } from 'react-router-dom';

export default function CuteButton({ label, to, onClick, variant = 'primary', className = '', type = 'button' }) {
  const classes = `cute-button ${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {label}
    </button>
  );
}
