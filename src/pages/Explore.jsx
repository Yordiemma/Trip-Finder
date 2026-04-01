import { useEffect, useState } from "react";
import { CalendarDays, ExternalLink, MapPin, Plus } from "lucide-react";
import EmptyState from "../components/EmptyState";

const fallbackEventImages = [
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
];

function Explore({ activities, onImportActivity }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEvents() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          "https://api.visitstockholm.com/api/public-v1/events/?size=8",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Could not load Stockholm events.");
        }

        const data = await response.json();
        const mappedEvents = (data.results || []).map((event, index) => {
          const category = event.categories?.[0]?.title || "Event";
          const location =
            event.venue_name || event.address || event.city || "Stockholm";
          const title =
            typeof event.title === "string"
              ? event.title
              : event.title?.en || event.title?.sv || "Stockholm event";
          const description =
            typeof event.description === "string"
              ? event.description
              : event.description?.en ||
                event.description?.sv ||
                "A Stockholm event that you can add to your weekend guide.";
          const eventUrl = event.external_website_url
            ? event.external_website_url
            : event.url
              ? `https://www.visitstockholm.com/${event.url}/`
              : "";
          const notes = event.closest_station
            ? `Closest station: ${event.closest_station}`
            : "Check the event page for details.";

          return {
            id: event.id,
            title,
            description,
            image: fallbackEventImages[index % fallbackEventImages.length],
            url: eventUrl,
            category,
            location,
            day: formatEventDay(event.start_date, event.end_date),
            priceLevel: "Medium",
            notes,
          };
        });

        setEvents(mappedEvents);
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        setEvents([
          {
            id: "fallback-concert",
            title: "Live Music Night in Stockholm",
            description: "Example event card shown because the event API could not load.",
            image: fallbackEventImages[0],
            url: "",
            category: "Nightlife",
            location: "Stockholm",
            day: "Friday",
            priceLevel: "Medium",
            notes: "Fallback event example.",
          },
          {
            id: "fallback-museum",
            title: "Weekend Museum Event",
            description: "A culture event example to keep Explore useful even when the API fails.",
            image: fallbackEventImages[1],
            url: "",
            category: "Culture",
            location: "Djurgarden",
            day: "Saturday",
            priceLevel: "Budget",
            notes: "Fallback event example.",
          },
        ]);
        setError("Visit Stockholm events could not load, so fallback event cards are shown.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main className="page-grid">
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore Events</p>
            <h2>Find events in Stockholm, then add the ones you like to your guide</h2>
          </div>
          <span className="pill">{error ? "Visit Stockholm + Fallback" : "Visit Stockholm API"}</span>
        </div>

        <p className="explore-intro">
          Explore shows events from the Stockholm API. When the user finds something
          interesting, they click <strong>Add to Manage</strong> and save it into
          their own weekend guide.
        </p>

        {isLoading ? (
          <EmptyState
            title="Loading events"
            description="Fetching Stockholm event ideas for the Explore page."
          />
        ) : (
          <div className="activity-grid">
            {error ? <p className="explore-message">{error}</p> : null}
            {events.map((event) => {
              const alreadyAdded = activities.some(
                (activity) =>
                  activity.title.toLowerCase() === event.title.toLowerCase() &&
                  activity.location.toLowerCase() === event.location.toLowerCase()
              );

              return (
                <article key={event.id} className="activity-card">
                  <div className="activity-card__image-wrap">
                    <img className="activity-card__image" src={event.image} alt={event.title} />
                  </div>

                  <div className="activity-card__content">
                    <div className="activity-card__badges">
                      <span className="badge badge--category">{event.category}</span>
                      <span className="badge">{event.day}</span>
                      <span className="badge">{event.priceLevel}</span>
                    </div>

                    <h3>{event.title}</h3>
                    <p className="activity-card__location">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </p>
                    <p className="activity-card__description">{event.description}</p>
                    <p className="activity-card__notes">
                      <CalendarDays size={16} />
                      <span>{event.notes}</span>
                    </p>

                    <div className="activity-card__actions">
                      <button
                        type="button"
                        className="button button--primary"
                        onClick={() => onImportActivity(event)}
                        disabled={alreadyAdded}
                      >
                        <Plus size={16} />
                        {alreadyAdded ? "Added to Manage" : "Add to Manage"}
                      </button>

                      {event.url ? (
                        <a
                          className="button button--secondary"
                          href={event.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink size={16} />
                          Event page
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

function formatEventDay(startDate, endDate) {
  if (!startDate) {
    return "All Weekend";
  }

  if (startDate !== endDate && endDate) {
    return "All Weekend";
  }

  const dayName = new Date(startDate).toLocaleDateString("en-US", {
    weekday: "long",
  });

  if (dayName === "Friday" || dayName === "Saturday" || dayName === "Sunday") {
    return dayName;
  }

  return "All Weekend";
}

export default Explore;
