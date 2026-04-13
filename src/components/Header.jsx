import { Link } from "react-router-dom";

function Header({ totalActivities, favoriteCount, weather }) {
  return (
    <header className="hero">
      <div className="hero__content">
        <p className="eyebrow">Weekend in Stockholm</p>
        <h1>Plan a stylish weekend around the city.</h1>
        <p className="hero__text">
          Browse inspiring activities, filter by vibe or day, and manage your
          own Stockholm weekend guide with full React CRUD.
        </p>
        <p className="hero__subtext">
          The app always starts on Home, then the user can explore ideas or save
          their own weekend plans.
        </p>
      </div>

      <div className="hero__stats">
        <Link
          className="stat-card stat-card--link"
          to="/manage"
          state={{ scrollToSavedEvents: true }}
          aria-label="Open saved events"
        >
          <strong>{totalActivities}</strong>
          <span>Activities</span>
        </Link>
        {/* REVIEW: Favorites link uses the same destination/state as Activities — does not filter or scroll to favorites-only; users may expect different behavior. */}
        <Link
          className="stat-card stat-card--link"
          to="/manage"
          state={{ scrollToSavedEvents: true }}
          aria-label="Open favorite saved events"
        >
          <strong>{favoriteCount}</strong>
          <span>Favorites</span>
        </Link>
        <article className="stat-card stat-card--weather">
          <strong>
            {weather.isLoading
              ? "..."
              : weather.temperature !== null
                ? `${Math.round(weather.temperature)}°C`
                : "--"}
          </strong>
          <span>Stockholm Weather</span>
          <small>
            {weather.error
              ? weather.error
              : weather.windSpeed !== null
                ? `Wind ${Math.round(weather.windSpeed)} km/h from Open-Meteo`
                : "Live API data"}
          </small>
        </article>
      </div>
    </header>
  );
}

export default Header;
