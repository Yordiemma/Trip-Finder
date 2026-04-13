import { useEffect } from "react";

function FeedbackMessage({ message, onDismiss }) {
  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      onDismiss();
    }, 2600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [message, onDismiss]);
  // REVIEW: If parent passes an inline onDismiss each render, this effect re-subscribes and can reset the auto-hide timer unexpectedly — wrap onDismiss in useCallback in App or omit from deps with eslint-disable + ref pattern.

  if (!message) {
    return null;
  }

  return (
    <div className={`feedback feedback--${message.type}`}>
      <span>{message.text}</span>
      <button type="button" onClick={onDismiss} aria-label="Dismiss message">
        Close
      </button>
    </div>
  );
}

export default FeedbackMessage;
