import { QortalMark } from './Brand';
import { Icon, type IconName } from './Icons';

const nodes: Array<{ label: string; icon: IconName; className: string }> = [
  { label: 'Q-Apps', icon: 'blocks', className: 'network-node--apps' },
  { label: 'QDN', icon: 'data', className: 'network-node--qdn' },
  { label: 'Q-Chat', icon: 'chat', className: 'network-node--chat' },
  { label: 'Names', icon: 'identity', className: 'network-node--names' },
  { label: 'Trade', icon: 'trade', className: 'network-node--trade' },
];

export function NetworkVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`network-visual${compact ? ' network-visual--compact' : ''}`}
      aria-label="Illustration of independent participants connected through Qortal"
    >
      <div className="network-grid" />
      <div className="network-orbit network-orbit--one" />
      <div className="network-orbit network-orbit--two" />
      <div className="network-core">
        <QortalMark />
        <strong>Qortal</strong>
        <span>community network</span>
      </div>
      {nodes.map((node) => (
        <div className={`network-node ${node.className}`} key={node.label}>
          <Icon name={node.icon} />
          <span>{node.label}</span>
        </div>
      ))}
      <i className="network-pulse network-pulse--one" />
      <i className="network-pulse network-pulse--two" />
      <i className="network-pulse network-pulse--three" />
    </div>
  );
}
