// src/components/MovieRow.jsx

import {
  useRef,
  useState,
  useEffect,
} from "react";

import MovieCard from "./MovieCard";

import "../styles/movie-row.css";


function RowSkeleton() {
  return (
    <div className="movie-row movie-row-skeleton">

      <div className="skeleton skeleton-title" />

      <div className="skeleton-cards">

        {Array.from({
          length: 6,
        }).map((_, i) => (
          <div
            key={i}
            className="skeleton skeleton-card"
          />
        ))}

      </div>

    </div>
  );
}


export default function MovieRow({
  title,
  fetchFn,
}) {

  const [
    movies,
    setMovies,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const scrollRef =
    useRef(null);


  useEffect(() => {

    let cancelled = false;

    async function loadMovies() {

      try {

        setLoading(true);
        setError(null);

        const data =
          await fetchFn();

        if (cancelled) {
          return;
        }

        const results =
          data?.results || [];

        // Remove duplicate IMDb IDs.
        const uniqueMovies =
          Array.from(
            new Map(
              results
                .filter(
                  (movie) =>
                    movie?.imdbID
                )
                .map(
                  (movie) => [
                    movie.imdbID,
                    movie,
                  ]
                )
            ).values()
          );

        setMovies(
          uniqueMovies
        );

      } catch (err) {

        console.error(
          `Failed to load ${title}:`,
          err
        );

        if (!cancelled) {
          setError(
            err.message ||
              "Failed to load movies"
          );
        }

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }

    }

    loadMovies();

    return () => {
      cancelled = true;
    };

  }, [title]);


  const scroll = (
    direction
  ) => {

    if (
      !scrollRef.current
    ) {
      return;
    }

    const amount =
      scrollRef.current
        .clientWidth * 0.8;

    scrollRef.current.scrollBy({
      left:
        direction * amount,
      behavior: "smooth",
    });

  };


  if (loading) {
    return <RowSkeleton />;
  }


  if (error) {
    return null;
  }


  if (!movies.length) {
    return null;
  }


  return (
    <section className="movie-row">

      <div className="movie-row-header">

        <h2 className="movie-row-title">
          {title}
        </h2>

      </div>


      <button
        className="scroll-btn scroll-prev"
        onClick={() =>
          scroll(-1)
        }
        aria-label="Scroll left"
      >
        ‹
      </button>


      <div
        className="movie-row-scroll"
        ref={scrollRef}
      >

        {movies.map(
          (movie) => (
            <MovieCard
              key={
                movie.imdbID
              }
              movie={movie}
            />
          )
        )}

      </div>


      <button
        className="scroll-btn scroll-next"
        onClick={() =>
          scroll(1)
        }
        aria-label="Scroll right"
      >
        ›
      </button>

    </section>
  );
}