export const StarRating = ({ rating }: { rating: number | string }) => (
  <div className="star-rating">
    <div className="star-rating__row">
      <span style={{marginTop:"6px"}} className="star-rating__label">Rating: {rating}</span>
      <div className="star-rating__stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i}>{+rating >= i ? "⭐" : "☆"}</span>
        ))}
      </div>
    </div>
  </div>
);
