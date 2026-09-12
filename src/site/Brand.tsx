import { Link } from 'react-router-dom';
import { qortalMark } from './brandAssets';

export function QortalMark({ className = '' }: { className?: string }) {
  return (
    <span className={`q-mark ${className}`} aria-hidden="true">
      <img src={qortalMark} alt="" />
    </span>
  );
}

export function QortalLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="q-logo" to="/" aria-label="Qortal home">
      <QortalMark />
      {!compact && <span>Qortal</span>}
    </Link>
  );
}
