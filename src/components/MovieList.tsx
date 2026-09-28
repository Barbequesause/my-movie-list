type FilterType = "all" | "watched" | "unwatched";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string[];
  watched: boolean;
};

type MovieListProps = {
  watchedStatus: Record<number, boolean>;
  ratings: Record<number, number>;
  onUpdateWatched: (id: number, isWatched: boolean) => void;
  onUpdateRating: (id: number, rating: number) => void;
  filter: FilterType;
  movies: Movie[];
};

const MovieList = ({
  watchedStatus,
  ratings,
  onUpdateWatched,
  onUpdateRating,
  filter,
  movies,
}: MovieListProps) => {
  const shouldShowMovie = (movie: Movie) => {
    const isWatched = watchedStatus[movie.id] || false;
    if (filter === "all") return true;
    if (filter === "watched") return isWatched;
    if (filter === "unwatched") return !isWatched;
    return false;
  };

  // to renderuje awokado
  const renderAvocadoRating = (movieId: number) => {
    const rating = ratings[movieId] || 0;
    const avocadoIcons = [];

    for (let i = 0; i < 5; i++) {
      avocadoIcons.push(
        <span
          key={i}
          style={{
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={() => onUpdateRating(movieId, i + 1)}
        >
          {i < rating ? "🥑" : "⚪"}
        </span>,
      );
    }

    return (
      <>
        {avocadoIcons}
        <span> {rating}/5</span>
      </>
    );
  };
  return (
    <div className="movie-list">
      <ul>
        {movies.map((movie) => {
          if (!shouldShowMovie(movie)) return null;

          return (
            <li key={movie.id}>
              <div>
                <strong>{movie.title}</strong> ({movie.year})
              </div>
              <div>
                <strong>Gatunek:</strong> {movie.genre.join(", ")}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                {watchedStatus[movie.id] ? "✅ Obejrzany" : "❌ Niezobaczony"}
              </div>
              <div>
                <label>
                  Ocena:
                  <div className="avocado-rating">
                    {renderAvocadoRating(movie.id)}
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Zmień status:
                  <input
                    type="checkbox"
                    checked={watchedStatus[movie.id] || false}
                    onChange={(e) =>
                      onUpdateWatched(movie.id, e.target.checked)
                    }
                  />
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
