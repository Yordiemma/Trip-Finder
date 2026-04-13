// REVIEW: Thin wrapper only — could inline <ActivityDashboard /> in AppRouter to reduce indirection unless Manage will gain route-specific logic.
import ActivityDashboard from "../components/ActivityDashboard";

function Manage(props) {
  return <ActivityDashboard {...props} />;
}

export default Manage;
