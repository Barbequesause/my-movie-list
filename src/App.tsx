import { useState } from "react";
import MovieList from "./components/MovieList";
import "./App.scss";

type FilterType = "all" | "watched" | "unwatched";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string[];
  watched: boolean;
};

function App() {
  const [watchedStatus, setWatchedStatus] = useState<Record<number, boolean>>(
    {},
  );
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [filter, setFilter] = useState<FilterType>("all");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [nextId, setNextId] = useState(1);

  const updateWatchedStatus = (id: number, isWatched: boolean) => {
    setWatchedStatus((prev) => ({
      ...prev,
      [id]: isWatched,
    }));
  };

  const updateRating = (id: number, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [id]: rating,
    }));
  };

  const clearAllWatched = () => {
    setWatchedStatus({});
    setRatings({});
  };

  const watchedCount = Object.values(watchedStatus).filter(
    (status) => status,
  ).length;
  const totalAvocados = 4;
  const isListEmpty =
    Object.keys(watchedStatus).length === 0 && filter !== "all";

  // Funkcja dodająca nowy film
  const addMovie = (title: string, year: number, genre: string[]) => {
    const newMovie: Movie = {
      id: nextId,
      title,
      year,
      genre,
      watched: false,
    };
    setMovies([...movies, newMovie]);
    setWatchedStatus((prev) => ({
      ...prev,
      [nextId]: false,
    }));
    setRatings((prev) => ({
      ...prev,
      [nextId]: 0,
    }));
    setNextId(nextId + 1);
  };

  return (
    <div className="app-container">
      <h1>🎬 Moja lista filmów</h1>

      {/* dodawanie filmów */}
      <div className="add-movie-form">
        <h2>Dodaj nowy film</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const title = (form.elements.namedItem("title") as HTMLInputElement)
              .value;
            const year = parseInt(
              (form.elements.namedItem("year") as HTMLInputElement).value,
            );
            const genreInputs = form.elements.namedItem(
              "genre",
            ) as NodeListOf<HTMLInputElement>;
            const genre = Array.from(genreInputs).map((input) => input.value);
            addMovie(title, year, genre);
            form.reset();
          }}
        >
          <div className="form-group">
            <label>Tytuł:</label>
            <input type="text" name="title" required />
          </div>
          <div className="form-group">
            <label>Rok:</label>
            <input type="number" name="year" min="1800" max="2026" required />
          </div>
          <div className="form-group">
            <label>Gatunek:</label>
            <div className="genre-inputs">
              <input
                type="text"
                name="genre"
                placeholder="np. Akcja"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => {
                const container = document.querySelector(".genre-inputs");
                const input = document.createElement("input");
                input.type = "text";
                input.name = "genre";
                input.placeholder = "np. Akcja";
                input.required = true;
                container?.appendChild(input);
              }}
            >
              +
            </button>
          </div>
          <button type="submit" className="add-button">
            Dodaj film
          </button>
        </form>
      </div>

      <div className="stats-section">
        <p className="stats-text">
          Obejrzane: <strong>{watchedCount}</strong> / {totalAvocados}
        </p>
        <button
          onClick={clearAllWatched}
          className="clear-button"
          disabled={Object.keys(watchedStatus).length === 0}
        >
          Wyczyść wszystkie
        </button>
      </div>

      <div className="filter-buttons">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          Wszystkie
        </button>
        <button
          onClick={() => setFilter("watched")}
          className={filter === "watched" ? "active" : ""}
        >
          Obejrzane
        </button>
        <button
          onClick={() => setFilter("unwatched")}
          className={filter === "unwatched" ? "active" : ""}
        >
          Nieobejrzane
        </button>
      </div>

      {isListEmpty ? (
        <p className="empty-message">Brak filmów do wyświetlenia</p>
      ) : (
        <MovieList
          watchedStatus={watchedStatus}
          ratings={ratings}
          onUpdateWatched={updateWatchedStatus}
          onUpdateRating={updateRating}
          filter={filter}
          movies={movies}
        />
      )}
    </div>
  );
}

export default App;
