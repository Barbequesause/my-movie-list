import avocado from "./avocado.png";
import "./MovieCard.scss";

type MovieCardProps = {
  id: number;
  title: string;
  year: number;
  genre: string;
  isWatched: boolean;
  rating: number;
  onUpdateWatched: (id: number, isWatched: boolean) => void;
  onUpdateRating: (id: number, rating: number) => void;
};
//karty filmów
const MovieCard = (props: MovieCardProps) => {
  const toggleWatched = () => {
    props.onUpdateWatched(props.id, !props.isWatched);
  };
  //na ocene
  const handleRatingClick = (selectedRating: number) => {
    props.onUpdateRating(props.id, selectedRating);
  };

  return (
    <div className={`movie-card ${props.isWatched ? "watched" : ""}`}>
      <h2>{props.title}</h2>
      <p>
        <strong>Rok produkcji:</strong> {props.year}
      </p>
      <p>
        <strong>Gatunek:</strong> {props.genre}
      </p>
      <button onClick={toggleWatched} className="watched-button">
        {props.isWatched ? "✓ Obejrzany" : "Oznacz jako obejrzony"}
      </button>

      <div className="rating-section">
        <label className="rating-label">Ocena:</label>
        <div className="rating-avocados">
          {[1, 2, 3, 4, 5].map((star) => (
            <img
              key={star}
              src={avocado}
              alt="awokado"
              className={`avocado-icon ${star <= props.rating ? "active" : ""}`}
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
