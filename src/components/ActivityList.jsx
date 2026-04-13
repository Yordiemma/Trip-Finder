import ActivityCard from "./ActivityCard";

function ActivityList({
  activities,
  focusedActivityId,
  onEdit,
  onDelete,
  onToggleFavorite,
}) {
  return (
    <div className="activity-grid">
      {/* REVIEW: New inline lambdas each render can cause ActivityCard to re-render more often if memoized later — pass ids + stable handlers if optimizing. */}
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          isFocused={activity.id === focusedActivityId}
          onEdit={() => onEdit(activity.id)}
          onDelete={() => onDelete(activity.id)}
          onToggleFavorite={() => onToggleFavorite(activity.id)}
        />
      ))}
    </div>
  );
}

export default ActivityList;
