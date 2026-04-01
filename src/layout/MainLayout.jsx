import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout({ totalActivities, favoriteCount, weather }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Header
        totalActivities={totalActivities}
        favoriteCount={favoriteCount}
        weather={weather}
      />

      <nav className="top-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => navClassName(isActive)}>
          Home
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) => navClassName(isActive)}
        >
          Explore
        </NavLink>
        <NavLink
          to="/manage"
          className={({ isActive }) => navClassName(isActive)}
        >
          Manage
        </NavLink>
      </nav>

      <div id="main-content">
        <Outlet />
      </div>
    </div>
  );
}

function navClassName(isActive) {
  return isActive ? "top-nav__link is-active" : "top-nav__link";
}

export default MainLayout;
