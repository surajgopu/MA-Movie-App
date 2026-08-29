// src/components/Hero.jsx

import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  searchMovies,
} from "../services/movieApi";

import {
  useMyList,
} from "../context/MyListContext";

import "../styles/hero.css";


function HeroSkeleton() {

  return (
    <div className="hero-skeleton">

      <div className="hero-skeleton-content">

        <div
          className="skeleton"
          style={{
            height: 20,
            width: 100,
            marginBottom: 8,
          }}
        />

        <div
          className="skeleton"
          style={{
            height: 52,
            width: 400,
            marginBottom: 12,
          }}
        />

        <div
          className="skeleton"
          style={{
            height: 16,
            width: 200,
            marginBottom: 16,
          }}
        />

      </div>

    </div>
  );
}


export default function Hero() {

  const [
    movies,
    setMovies,
  ] = useState([]);

  const [
    current,
    setCurrent,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const navigate =
    useNavigate();

  const {
    isInList,
    toggleList,
  } = useMyList();


  useEffect(() => {

    async function loadHero() {

      try {

        const searches = [
          "avengers",
          "batman",
          "spider",
          "star wars",
          "mission",
        ];


        const responses =
          await Promise.all(
            searches.map(
              (query) =>
                searchMovies(
                  query,
                  1
                )
            )
          );


        const allMovies =
          responses.flatMap(
            (response) =>
              response.results || []
          );


        const uniqueMovies =
          Array.from(
            new Map(
              allMovies.map(
                (movie) => [
                  movie.imdbID,
                  movie,
                ]
              )
            ).values()
          );


        setMovies(
          uniqueMovies.slice(
            0,
            8
          )
        );

      } catch (error) {

        console.error(
          "Hero loading error:",
          error
        );

      } finally {

        setLoading(false);

      }

    }


    loadHero();

  }, []);


  useEffect(() => {

    if (
      movies.length < 2
    ) {
      return;
    }


    const timer =
      setInterval(() => {

        setCurrent(
          (previous) =>
            (previous + 1) %
            movies.length
        );

      }, 7000);


    return () =>
      clearInterval(timer);

  }, [movies]);


  if (loading) {
    return <HeroSkeleton />;
  }


  if (!movies.length) {
    return null;
  }


  const movie =
    movies[current];


  const backdrop =
    movie.backdrop_path;


  const year =
    movie.Year ||
    movie.release_date ||
    "";


  const rating =
    movie.vote_average
      ? Number(
          movie.vote_average
        ).toFixed(1)
      : "";


  const inList =
    isInList(
      movie.imdbID
    );


  return (
    <div className="hero">

      <div
        className="hero-backdrop"
        style={{
          backgroundImage:
            backdrop
              ? `url(${backdrop})`
              : "none",
        }}
        role="img"
        aria-label={`${movie.title} backdrop`}
      />


      <div className="hero-overlay" />


      <div className="hero-content">

        <div className="hero-badge">
          🔥 Featured Movie
        </div>


        <h1 className="hero-title">
          {movie.title}
        </h1>


        <div className="hero-meta">

          {rating && (
            <span className="hero-rating">
              ⭐ {rating}
            </span>
          )}

          {year && (
            <span className="hero-year">
              {year}
            </span>
          )}

        </div>


        {movie.overview && (
          <p className="hero-description">
            {movie.overview}
          </p>
        )}


        <div className="hero-actions">

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
              navigate(
                `/movie/${movie.imdbID}`
              )
            }
          >
            ⓘ More Info
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
  );
}