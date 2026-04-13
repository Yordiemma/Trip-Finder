import { useEffect, useMemo, useState } from "react";
import AppRouter from "./routers/AppRouter";

// REVIEW: Weather coordinates are hardcoded; consider env or user location for reuse outside Stockholm demo.
const weatherRequestUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=59.3293&longitude=18.0686&current=temperature_2m,wind_speed_10m&timezone=Europe%2FStockholm";

function App() {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [weather, setWeather] = useState({
    isLoading: true,
    error: "",
    temperature: null,
    windSpeed: null,
  });

  const editingActivity =
    activities.find((activity) => activity.id === editingActivityId) || null;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStockholmWeather() {
      try {
        const response = await fetch(weatherRequestUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load Stockholm weather.");
        }

        const data = await response.json();

        setWeather({
          isLoading: false,
          error: "",
          temperature: data.current?.temperature_2m ?? null,
          windSpeed: data.current?.wind_speed_10m ?? null,
        });
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        setWeather({
          isLoading: false,
          error: "Weather API unavailable right now.",
          temperature: null,
          windSpeed: null,
        });
      }
    }

    fetchStockholmWeather();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredActivities = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const filtered = activities.filter((activity) => {
      const matchesCategory =
        selectedCategory === "All" || activity.category === selectedCategory;
      const matchesDay =
        selectedDay === "All" ||
        activity.day === selectedDay ||
        activity.day === "All Weekend";
      const matchesSearch =
        normalizedSearch.length === 0 ||
        activity.title.toLowerCase().includes(normalizedSearch) ||
        activity.location.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesDay && matchesSearch;
    });

    const sorted = [...filtered];

    if (sortBy === "title") {
      sorted.sort((firstItem, secondItem) =>
        firstItem.title.localeCompare(secondItem.title),
      );
    }

    if (sortBy === "day") {
      const dayOrder = {
        Friday: 1,
        Saturday: 2,
        Sunday: 3,
        "All Weekend": 4,
      };

      // REVIEW: If activity.day is missing or not in dayOrder, sort compares NaN and order becomes unstable.
      sorted.sort(
        (firstItem, secondItem) =>
          dayOrder[firstItem.day] - dayOrder[secondItem.day],
      );
    }

    if (sortBy === "price") {
      const priceOrder = {
        Free: 1,
        Budget: 2,
        Medium: 3,
        Premium: 4,
      };

      // REVIEW: Same as day sort — unknown priceLevel yields NaN and unpredictable ordering.
      sorted.sort(
        (firstItem, secondItem) =>
          priceOrder[firstItem.priceLevel] - priceOrder[secondItem.priceLevel],
      );
    }

    if (sortBy === "favorites") {
      sorted.sort(
        (firstItem, secondItem) =>
          Number(secondItem.favorite) - Number(firstItem.favorite),
      );
    }

    // REVIEW: sortBy "featured" does not apply a defined ordering; list stays insertion order — document or implement explicit featured logic.
    return sorted;
  }, [activities, searchQuery, selectedCategory, selectedDay, sortBy]);

  function showFeedback(type, text) {
    setFeedbackMessage({
      id: crypto.randomUUID(),
      type,
      text,
    });
  }

  function handleAddActivity(activityData) {
    // REVIEW: crypto.randomUUID() is unavailable in very old browsers / non-secure contexts; consider a tiny fallback id helper if you need broad support.
    const newActivity = {
      ...activityData,
      id: crypto.randomUUID(),
      favorite: false,
    };

    setActivities((currentActivities) => [newActivity, ...currentActivities]);
    showFeedback("success", "Activity added.");
  }

  function handleImportActivity(activityData) {
    const existingActivity = activities.find(
      (activity) =>
        activity.title.toLowerCase() === activityData.title.toLowerCase() &&
        activity.location.toLowerCase() === activityData.location.toLowerCase(),
    );

    if (existingActivity) {
      showFeedback("info", "That place is already in Manage.");
      return existingActivity;
    }

    const importedActivity = {
      ...activityData,
      id: crypto.randomUUID(),
      favorite: false,
    };

    setActivities((currentActivities) => [
      importedActivity,
      ...currentActivities,
    ]);
    showFeedback("success", "Place added to Manage.");
    return importedActivity;
  }

  function handleUpdateActivity(activityData) {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === editingActivityId
          ? { ...activity, ...activityData }
          : activity,
      ),
    );
    setEditingActivityId(null);
    showFeedback("success", "Activity updated.");
  }

  function handleDeleteActivity(activityId) {
    setActivities((currentActivities) =>
      currentActivities.filter((activity) => activity.id !== activityId),
    );

    if (editingActivityId === activityId) {
      setEditingActivityId(null);
    }

    showFeedback("success", "Activity deleted.");
  }

  function handleToggleFavorite(activityId) {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === activityId
          ? { ...activity, favorite: !activity.favorite }
          : activity,
      ),
    );
  }

  function handleStartEdit(activityId) {
    setEditingActivityId(activityId);
  }

  function handleCancelEdit() {
    setEditingActivityId(null);
    showFeedback("info", "Edit cancelled.");
  }

  function handleClearFilters() {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDay("All");
    // REVIEW: sortBy is not reset here; "Clear filters" may still leave a non-default sort — confirm UX intent.
  }

  return (
    <AppRouter
      activities={activities}
      filteredActivities={filteredActivities}
      weather={weather}
      searchQuery={searchQuery}
      selectedCategory={selectedCategory}
      selectedDay={selectedDay}
      sortBy={sortBy}
      editingActivity={editingActivity}
      onSearchChange={setSearchQuery}
      onCategoryChange={setSelectedCategory}
      onDayChange={setSelectedDay}
      onSortChange={setSortBy}
      onClearFilters={handleClearFilters}
      onAddActivity={handleAddActivity}
      onImportActivity={handleImportActivity}
      onUpdateActivity={handleUpdateActivity}
      onDeleteActivity={handleDeleteActivity}
      onEditActivity={handleStartEdit}
      onCancelEdit={handleCancelEdit}
      onToggleFavorite={handleToggleFavorite}
      feedbackMessage={feedbackMessage}
      onDismissFeedback={() => setFeedbackMessage(null)}
    />
  );
}

export default App;
