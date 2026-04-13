import { Heart, MapPin, Pencil, Trash2 } from "lucide-react";

function ActivityCard({
  activity,
  isFocused,
  onEdit,
  onDelete,
  onToggleFavorite,
}) {
  const {
    id,
    title,
    category,
    description,
    location,
    day,
    priceLevel,
    image,
    favorite,
    notes,
  } = activity;

  return (
    <article
      id={`activity-${id}`}
      className={`activity-card ${isFocused ? "activity-card--focused" : ""}`}
    >
      <div className="activity-card__image-wrap">
        <img
          className="activity-card__image"
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
        />
        <button
          type="button"
          className={`favorite-toggle ${favorite ? "is-active" : ""}`}
          onClick={onToggleFavorite}
          aria-label={favorite ? "Remove favorite" : "Add favorite"}
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="activity-card__content">
        <div className="activity-card__badges">
          <span className="badge badge--category">{category}</span>
          <span className="badge">{day}</span>
          <span className="badge">{priceLevel}</span>
        </div>

        <h3>{title}</h3>

        <p className="activity-card__location">
          <MapPin size={16} />
          <span>{location}</span>
        </p>

        <p className="activity-card__description">{description}</p>
        {notes ? <p className="activity-card__notes">{notes}</p> : null}

        <div className="activity-card__actions">
          <button
            type="button"
            className="button button--secondary"
            onClick={onEdit}
          >
            <Pencil size={16} />
            Edit
          </button>
          {/* REVIEW: Delete is immediate with no confirmation — consider window.confirm or an accessible confirm dialog for destructive actions. */}
          <button
            type="button"
            className="button button--danger"
            onClick={onDelete}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default ActivityCard;
