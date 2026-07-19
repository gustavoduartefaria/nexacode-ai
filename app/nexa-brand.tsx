type NexaMarkProps = {
  compact?: boolean;
  className?: string;
};

export function NexaMark({ compact = false, className = "" }: NexaMarkProps) {
  return (
    <span
      className={`nexa-mark${compact ? " nexa-mark-compact" : ""}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <i className="nexa-mark-rail rail-left" />
      <i className="nexa-mark-rail rail-right" />
      <b>N</b>
      <span className="nexa-mark-node node-one" />
      <span className="nexa-mark-node node-two" />
    </span>
  );
}
