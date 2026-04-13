import { categoryOptions, dayOptions } from "../utils/activityOptions";

function FilterBar({
  selectedCategory,
  selectedDay,
  sortBy,
  onCategoryChange,
  onDayChange,
  onSortChange,
  onClearFilters,
}) {
  return (
    <div className="filter-bar">
      <label className="filter-group">
        <span>Category</span>
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="All">All categories</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-group">
        <span>Day</span>
        <select
          value={selectedDay}
          onChange={(event) => onDayChange(event.target.value)}
        >
          <option value="All">All days</option>
          {dayOptions.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-group">
        <span>Sort by</span>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="featured">Featured order</option>
          <option value="title">Title</option>
          <option value="day">Day</option>
          <option value="price">Price level</option>
          <option value="favorites">Favorites first</option>
        </select>
      </label>

      {/* REVIEW: Button clears search/category/day in parent but not sort — label says "filters" which may or may not include sort; align copy and behavior. */}
      <button
        type="button"
        className="button button--secondary"
        onClick={onClearFilters}
      >
        Clear filters
      </button>
    </div>
  );
}

export default FilterBar;
