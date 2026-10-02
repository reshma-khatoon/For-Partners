export default function PageTransition({ children, className = '' }) {
  return <div className={`page-shell page-transition ${className}`.trim()}>{children}</div>;
}
