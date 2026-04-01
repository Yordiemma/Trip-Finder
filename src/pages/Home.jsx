import { Link, useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";

const stockholmHighlights = [
  {
    title: "Gamla Stan",
    description: "Historic streets, cafes, and a classic first stop in the city.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Stockholm%20%E2%80%93%20S%C3%B6dermalm%20%E2%80%93%20Gamla%20stan%20-%20panoramio.jpg",
  },
  {
    title: "Djurgarden",
    description: "A calm island area for museums, walks, and park time.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Stockholm Waterfront",
    description: "Views, ferries, and a strong city feeling for the weekend.",
    image:
      "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200&q=80",
  },
];

const homeEventPreviews = [
  {
    title: "Free Friday at Moderna Museet",
    location: "Skeppsholmen",
    day: "Friday",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Live Music Night",
    location: "Sodermalm",
    day: "Saturday",
    category: "Nightlife",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Weekend Market Walk",
    location: "Kungsholmen",
    day: "Sunday",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80",
  },
];

function Home({ activities, favoriteCount }) {
  const navigate = useNavigate();

  return (
    <main className="page-grid">
      <section className="panel home-hero-panel">
        <div className="home-hero-panel__content">
          <p className="eyebrow">Home Page</p>
          <h2>Start here and build your Stockholm weekend guide</h2>
          <p>
            Home is the starting page. Explore gives ideas from an API, and Manage
            lets the user save, edit, delete, and organize their own activities.
          </p>
          <div className="home-hero-panel__actions">
            <Link to="/explore" className="button button--primary">
              Explore ideas
            </Link>
            <Link to="/manage" className="button button--secondary">
              Open Manage
            </Link>
          </div>
        </div>

        <img
          className="home-hero-panel__image"
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80"
          alt="Stockholm waterfront with historic buildings"
        />
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start here</p>
            <h2>What to do this weekend in Stockholm?</h2>
          </div>
        </div>

        <div className="home-grid">
          <article className="info-card">
            <h3>Your weekend guide</h3>
            <p>
              Use <strong>Manage</strong> to save events you want to go to, then
              edit, delete, and organize them.
            </p>
            <Link to="/manage" className="button button--primary">
              Open manage page
            </Link>
          </article>

          <article className="info-card">
            <h3>Explore first</h3>
            <p>
              Visit <strong>Explore</strong> to see Stockholm events loaded
              automatically from an API before you save them.
            </p>
            <Link to="/explore" className="button button--secondary">
              Explore Stockholm
            </Link>
          </article>

          <article className="info-card">
            <h3>Quick summary</h3>
            <p>{activities.length} activities created</p>
            <p>{favoriteCount} favorites saved</p>
            <p>Find events in Explore and save them in Manage.</p>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured Event Ideas</p>
            <h2>Some event styles you can look for in Stockholm</h2>
          </div>
          <Link to="/explore" className="button button--secondary">
            See more in Explore
          </Link>
        </div>

        <div className="home-event-grid">
          {homeEventPreviews.map((event) => (
            <article key={event.title} className="home-event-card">
              <img src={event.image} alt={event.title} loading="lazy" decoding="async" />
              <div className="home-event-card__content">
                <div className="activity-card__badges">
                  <span className="badge badge--category">{event.category}</span>
                  <span className="badge">{event.day}</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Stockholm Inspiration</p>
            <h2>Popular Stockholm areas for your weekend plans</h2>
          </div>
        </div>

        <div className="home-highlight-grid">
          {stockholmHighlights.map((highlight) => (
            <article key={highlight.title} className="home-highlight-card">
              <img src={highlight.image} alt={highlight.title} loading="lazy" decoding="async" />
              <div className="home-highlight-card__content">
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your items</p>
            <h2>Current activity list</h2>
          </div>
        </div>

        {activities.length === 0 ? (
          <EmptyState
            title="No activities yet"
            description="Go to Manage to add your first Stockholm weekend activity."
            
            actionLabel="Go to manage"
            onAction={() => navigate("/manage")}
          />
        ) : (
          <div className="home-list">
            {activities.slice(0, 4).map((activity) => (
              <article key={activity.id} className="home-list__item">
                <img src={activity.image} alt={activity.title} loading="lazy" decoding="async" />
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.location}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
