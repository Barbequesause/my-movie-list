import MovieCard from "./MovieCard";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

type MovieListProps = {
  watchedStatus: Record<number, boolean>;
  ratings: Record<number, number>;
  onUpdateWatched: (id: number, isWatched: boolean) => void;
  onUpdateRating: (id: number, rating: number) => void;
  filter: "all" | "watched" | "unwatched";
};

const movies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
  },
  {
    id: 3,
    title: "Daredevil",
    year: 2003,
    genre: "Action",
  },
  {
    id: 4,
    title: "Punisher",
    year: 2004,
    genre: "Action",
  },
];

const MovieList = (props: MovieListProps) => {
  const filteredMovies = movies.filter((movie) => {
    if (props.filter === "all") return true;
    if (props.filter === "watched") return props.watchedStatus[movie.id];
    if (props.filter === "unwatched") return !props.watchedStatus[movie.id];
    return true;
  });

  if (filteredMovies.length === 0) {
    return <p className="empty-message">Brak filmów do wyświetlenia</p>;
  }

  return (
    <div className="movie-list">
      {filteredMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          year={movie.year}
          genre={movie.genre}
          isWatched={props.watchedStatus[movie.id] || false}
          rating={props.ratings[movie.id] || 0}
          onUpdateWatched={props.onUpdateWatched}
          onUpdateRating={props.onUpdateRating}
        />
      ))}
    </div>
  );
};

export default MovieList;
