import { useState } from "react";
import MovieList from "./components/MovieList";
import "./App.scss";

type FilterType = "all" | "watched" | "unwatched";

const App = () => {
  const [watchedStatus, setWatchedStatus] = useState<Record<number, boolean>>(
    {},
  );
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [filter, setFilter] = useState<FilterType>("all");

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
  const totalMovies = 4;
  const isListEmpty =
    Object.keys(watchedStatus).length === 0 && filter !== "all";

  return (
    <div className="app-container">
      <h1>Moja lista filmów</h1>

      <div className="stats-section">
        <p className="stats-text">
          Obejrzane: <strong>{watchedCount}</strong> / {totalMovies}
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
        />
      )}
    </div>
  );
};

export default App;
