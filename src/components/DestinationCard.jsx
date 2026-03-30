function DestinationCard({ image, title, location, price, rating }) {
  return (
    <article className="destination-card">
      <img src={image} alt={title} className="destination-card__image" />

      <div className="destination-card__content">
        <div>
          <h3>{title}</h3>
          <p>{location}</p>
        </div>

        <div>
          <p>{rating}</p>
          <p>{price}</p>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;