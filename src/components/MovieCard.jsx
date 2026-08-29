import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosterUrl } from "../services/movieApi";
import { useMyList } from "../context/MyListContext";
import "../styles/movie-card.css";

export function MovieCardSkeleton() {
  return (
    <div className="movie-card-skeleton">
      <div className="skeleton skeleton-poster" />
    </div>
  );
}

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const {
    isInList,
    toggleList,
  } = useMyList();

  const [imageError, setImageError] = useState(false);

  const movieId =
    movie.imdbID ||
    movie.id;

  const title =
    movie.title ||
    movie.Title ||
    "Unknown Movie";

  const posterUrl =
    getPosterUrl(
      movie.poster_path ||
      movie.Poster
    );

  const year =
    movie.Year ||
    movie.release_date ||
    "—";

  const rating =
    movie.vote_average ||
    movie.imdbRating ||
    0;

  const inList =
    isInList(movieId);

  const openDetails = () => {
    navigate(`/movie/${movieId}`);
  };

  const handlePlay = (e) => {
    e.stopPropagation();

    navigate(`/watch/${movieId}`);
  };

  const handleList = (e) => {
    e.stopPropagation();

    toggleList({
      ...movie,
      id: movieId,
      imdbID: movieId,
      title,
      Title: title,
    });
  };

  const handleInfo = (e) => {
    e.stopPropagation();

    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      className="movie-card"
      onClick={openDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          openDetails();
        }
      }}
      aria-label={`View details for ${title}`}
    >

      {posterUrl && !imageError ? (
        <img
          className="movie-card-poster"
          src={posterUrl}
          alt={title}
          loading="lazy"
          onError={() => {
            setImageError(true);
          }}
        />
      ) : (
        <div className="movie-card-placeholder">
          <span>🎬</span>
          <p>{title}</p>
        </div>
      )}

      <div className="movie-card-overlay">

        <div className="movie-card-actions">

          <button
            className="card-btn card-btn-play"
            onClick={handlePlay}
            aria-label={`Play ${title}`}
          >
            ▶
          </button>

          <button
            className={`card-btn card-btn-list${
              inList
                ? " in-list"
                : ""
            }`}
            onClick={handleList}
            aria-label={
              inList
                ? "Remove from My List"
                : "Add to My List"
            }
          >
            {inList ? "✓" : "+"}
          </button>

          <button
            className="card-btn card-btn-info"
            onClick={handleInfo}
            aria-label={`More information about ${title}`}
          >
            ⓘ
          </button>

        </div>

        <div className="movie-card-title">
          {title}
        </div>

        <div className="movie-card-meta">

          <span className="movie-card-rating">
            ⭐{" "}
            {rating
              ? Number(rating).toFixed(1)
              : "—"}
          </span>

          <span>
            {year}
          </span>

        </div>

      </div>

    </div>
  );
}