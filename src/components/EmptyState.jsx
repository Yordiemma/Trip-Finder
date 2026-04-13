// REVIEW: No propTypes/TypeScript — callers can pass actionLabel without onAction and get no button silently; JSDoc or TS would catch mismatches.
function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state__art" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          className="button button--primary"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export default EmptyState;
