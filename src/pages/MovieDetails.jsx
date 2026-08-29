// src/pages/MovieDetails.jsx

import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import MovieRow from "../components/MovieRow";

import {
  LoadingSpinner,
} from "../components/Loading";

import ErrorMessage from "../components/ErrorMessage";

import {
  useMyList,
} from "../context/MyListContext";

import {
  getMovieDetails,
  getSimilarMovies,
  getPosterUrl,
} from "../services/movieApi";

import "../styles/movie-details.css";


function CastSection({
  actors,
}) {

  if (
    !actors ||
    !actors.length
  ) {
    return null;
  }


  return (
    <section
      className="movie-cast-section"
      aria-labelledby="cast-heading"
    >

      <h2 id="cast-heading">
        Cast
      </h2>


      <div className="cast-grid">

        {actors
          .slice(0, 16)
          .map(
            (actor, index) => (

              <div
                key={`${actor}-${index}`}
                className="cast-card"
              >

                <div
                  className="cast-avatar-placeholder"
                  aria-hidden="true"
                >
                  👤
                </div>

                <div className="cast-name">
                  {actor}
                </div>

              </div>

            )
          )}

      </div>

    </section>
  );
}


export default function MovieDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    isInList,
    toggleList,
  } = useMyList();


  const [
    movie,
    setMovie,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);


  const load = async () => {

    try {

      setLoading(true);
      setError(null);

      const data =
        await getMovieDetails(
          id
        );

      setMovie(data);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
          "Failed to load movie."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    window.scrollTo(
      0,
      0
    );

    load();

  }, [id]);


  if (loading) {

    return (
      <div
        style={{
          minHeight:
            "100vh",
          background:
            "var(--background)",
        }}
      >

        <Navbar />

        <div
          style={{
            paddingTop: 100,
          }}
        >

          <LoadingSpinner />

        </div>

      </div>
    );
  }


  if (error) {

    return (
      <div
        style={{
          minHeight:
            "100vh",
          background:
            "var(--background)",
        }}
      >

        <Navbar />

        <div
          style={{
            paddingTop: 100,
          }}
        >

          <ErrorMessage
            message={error}
            onRetry={load}
          />

        </div>

      </div>
    );
  }


  if (!movie) {
    return null;
  }


  const poster =
    getPosterUrl(
      movie.poster_path
    );


  const inList =
    isInList(
      movie.imdbID
    );


  const rating =
    movie.imdbRating ||
    movie.vote_average ||
    0;


  const year =
    movie.Year ||
    "";


  const runtime =
    movie.runtime ||
    "";


  return (
    <div className="movie-details-page">

      <Navbar />


      <button
        className="back-btn"
        onClick={() =>
          navigate(-1)
        }
        aria-label="Go back"
      >
        ← Back
      </button>


      <div
        className="movie-details-hero"
        style={{
          backgroundImage:
            poster
              ? `url(${poster})`
              : "none",
        }}
        role="img"
        aria-label={`${movie.title} background`}
      >

        <div className="movie-details-hero-overlay" />


        <div className="movie-details-content">

          {poster && (
            <img
              className="movie-details-poster"
              src={poster}
              alt={`${movie.title} poster`}
            />
          )}


          <div className="movie-details-info">

            <h1 className="movie-details-title">
              {movie.title}
            </h1>


            <div className="movie-details-meta">

              {rating > 0 && (
                <span className="meta-rating">
                  ⭐{" "}
                  {Number(
                    rating
                  ).toFixed(1)}
                  /10
                </span>
              )}


              {year && (
                <span className="meta-item">
                  {year}
                </span>
              )}


              {runtime && (
                <span className="meta-item">
                  {runtime}
                </span>
              )}


              {movie.original_language && (
                <span className="meta-badge">
                  {movie.original_language}
                </span>
              )}

            </div>


            {movie.genres?.length > 0 && (

              <div className="movie-details-genres">

                {movie.genres.map(
                  (genre) => (

                    <span
                      key={genre.id}
                      className="details-genre-tag"
                    >
                      {genre.name}
                    </span>

                  )
                )}

              </div>

            )}


            <div className="movie-details-actions">

              <button
                className="btn btn-white"
                onClick={() =>
                  navigate(
                    `/watch/${movie.imdbID}`
                  )
                }
              >
                ▶ Play
              </button>


              <button
                className="btn btn-outline"
                onClick={() =>
                  toggleList(movie)
                }
              >
                {inList
                  ? "✓ In My List"
                  : "+ My List"}
              </button>

            </div>

          </div>

        </div>

      </div>


      {movie.overview && (

        <section
          className="movie-details-overview"
          aria-labelledby="overview-heading"
        >

          <h2 id="overview-heading">
            Overview
          </h2>

          <p>
            {movie.overview}
          </p>

        </section>

      )}


      <div className="movie-info-grid">

        {movie.director && (
          <div className="movie-info-item">

            <h4>
              Director
            </h4>

            <p>
              {movie.director}
            </p>

          </div>
        )}


        {movie.writer && (
          <div className="movie-info-item">

            <h4>
              Writer
            </h4>

            <p>
              {movie.writer}
            </p>

          </div>
        )}


        {movie.country && (
          <div className="movie-info-item">

            <h4>
              Country
            </h4>

            <p>
              {movie.country}
            </p>

          </div>
        )}


        {movie.awards && (
          <div className="movie-info-item">

            <h4>
              Awards
            </h4>

            <p>
              {movie.awards}
            </p>

          </div>
        )}


        {movie.imdbVotes && (
          <div className="movie-info-item">

            <h4>
              IMDb Votes
            </h4>

            <p>
              {movie.imdbVotes}
            </p>

          </div>
        )}

      </div>


      <CastSection
        actors={movie.actors}
      />


      <div className="similar-section">

        <MovieRow
          title="More Like This"
          fetchFn={() =>
            getSimilarMovies(movie)
          }
        />

      </div>

    </div>
  );
}