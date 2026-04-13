// REVIEW: Many props passed through — consider React Context or a small store if this grows further.
import { HashRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Manage from "../pages/Manage";

function AppRouter({
  activities,
  filteredActivities,
  weather,
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
  onImportActivity,
  onUpdateActivity,
  onDeleteActivity,
  onEditActivity,
  onCancelEdit,
  onToggleFavorite,
  feedbackMessage,
  onDismissFeedback,
}) {
  const favoriteCount = activities.filter(
    (activity) => activity.favorite,
  ).length;

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              totalActivities={activities.length}
              favoriteCount={favoriteCount}
              weather={weather}
            />
          }
        >
          <Route
            index
            element={
              <Home activities={activities} favoriteCount={favoriteCount} />
            }
          />
          <Route
            path="explore"
            element={
              <Explore
                activities={activities}
                onImportActivity={onImportActivity}
              />
            }
          />
          <Route
            path="manage"
            element={
              <Manage
                activities={filteredActivities}
                totalActivities={activities.length}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedDay={selectedDay}
                sortBy={sortBy}
                editingActivity={editingActivity}
                onSearchChange={onSearchChange}
                onCategoryChange={onCategoryChange}
                onDayChange={onDayChange}
                onSortChange={onSortChange}
                onClearFilters={onClearFilters}
                onAddActivity={onAddActivity}
                onUpdateActivity={onUpdateActivity}
                onDeleteActivity={onDeleteActivity}
                onEditActivity={onEditActivity}
                onCancelEdit={onCancelEdit}
                onToggleFavorite={onToggleFavorite}
                feedbackMessage={feedbackMessage}
                onDismissFeedback={onDismissFeedback}
              />
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
