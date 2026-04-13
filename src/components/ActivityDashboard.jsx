import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import EmptyState from "./EmptyState";
import FeedbackMessage from "./FeedbackMessage";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";

function ActivityDashboard({
  activities,
  totalActivities,
  searchQuery,
  selectedCategory,
  selectedDay,
  sortBy,
  editingActivity,
  onSearchChange,
  onCategoryChange,
  onDayChange,
  onSortChange,
  onClearFilters,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity,
  onEditActivity,
  onCancelEdit,
  onToggleFavorite,
  feedbackMessage,
  onDismissFeedback,
}) {
  const location = useLocation();
  const formPanelRef = useRef(null);
  const listPanelRef = useRef(null);
  const focusedActivityId = location.state?.focusActivityId ?? null;
  const shouldScrollToSavedEvents = Boolean(
    location.state?.scrollToSavedEvents,
  );
  // REVIEW: Router location.state is not cleared after scroll; revisiting Manage with stale state may re-scroll unexpectedly — consider navigate(..., { replace: true, state: {} }) after handling.

  useEffect(() => {
    if (!editingActivity || !formPanelRef.current) {
      return;
    }

    window.requestAnimationFrame(() => {
      formPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const firstInput = formPanelRef.current?.querySelector(
        "input, textarea, select",
      );
      firstInput?.focus();
    });
  }, [editingActivity]);

  useEffect(() => {
    if (!focusedActivityId) {
      return;
    }

    window.requestAnimationFrame(() => {
      const activityCard = document.getElementById(
        `activity-${focusedActivityId}`,
      );

      activityCard?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [focusedActivityId, activities]);

  useEffect(() => {
    if (!shouldScrollToSavedEvents || focusedActivityId) {
      return;
    }

    window.requestAnimationFrame(() => {
      listPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [focusedActivityId, shouldScrollToSavedEvents]);

  return (
    <main className="dashboard">
      <section className="panel panel--filters">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Search And Filter</p>
            <h2>Find events inside your saved Stockholm weekend guide</h2>
          </div>
          <span className="pill">
            {activities.length} of {totalActivities} shown
          </span>
        </div>

        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <FilterBar
          selectedCategory={selectedCategory}
          selectedDay={selectedDay}
          sortBy={sortBy}
          onCategoryChange={onCategoryChange}
          onDayChange={onDayChange}
          onSortChange={onSortChange}
          onClearFilters={onClearFilters}
        />
      </section>

      <section className="dashboard__grid">
        <div
          className="panel panel--form"
          ref={formPanelRef}
          // REVIEW: tabIndex={-1} is idiomatic in React (number); string "-1" works in DOM but prefer numeric for consistency with docs.
          tabIndex="-1"
          aria-labelledby="event-form-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Weekend Guide</p>
              <h2 id="event-form-heading">
                {editingActivity
                  ? "Edit saved event"
                  : "Add event to your guide"}
              </h2>
            </div>
          </div>

          <ActivityForm
            key={editingActivity?.id || "add-mode"}
            initialValues={editingActivity}
            isEditing={Boolean(editingActivity)}
            onSubmit={editingActivity ? onUpdateActivity : onAddActivity}
            onCancel={editingActivity ? onCancelEdit : undefined}
          />
        </div>

        <div className="panel panel--list" ref={listPanelRef} id="saved-events">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Saved Events</p>
              <h2>Your Stockholm weekend guide</h2>
            </div>
          </div>

          {activities.length === 0 ? (
            <EmptyState
              title={
                totalActivities === 0
                  ? "No activities added yet"
                  : "No events match your filters"
              }
              description={
                totalActivities === 0
                  ? "Use Explore or the form to add your first Stockholm weekend event."
                  : "Try clearing the filters, changing the day, or adding another event."
              }
              actionLabel={totalActivities === 0 ? null : "Clear filters"}
              onAction={totalActivities === 0 ? undefined : onClearFilters}
            />
          ) : (
            <ActivityList
              activities={activities}
              focusedActivityId={focusedActivityId}
              onEdit={onEditActivity}
              onDelete={onDeleteActivity}
              onToggleFavorite={onToggleFavorite}
            />
          )}
        </div>
      </section>

      <FeedbackMessage
        message={feedbackMessage}
        onDismiss={onDismissFeedback}
      />
    </main>
  );
}

export default ActivityDashboard;
