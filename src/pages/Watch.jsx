// src/pages/Watch.jsx

import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getMovieDetails,
} from "../services/movieApi";

import {
  LoadingSpinner,
} from "../components/Loading";

import "../styles/watch.css";


export default function Watch() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();


  const [
    movie,
    setMovie,
  ] = useState(null);


  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    window.scrollTo(
      0,
      0
    );


    async function loadMovie() {

      try {

        const data =
          await getMovieDetails(
            id
          );

        setMovie(data);

      } catch (error) {

        console.error(
          "Watch page error:",
          error
        );

      } finally {

        setLoading(false);

      }

    }


    loadMovie();

  }, [id]);


  if (loading) {

    return (
      <div
        className="watch-page"
        style={{
          alignItems:
            "center",
          justifyContent:
            "center",
        }}
      >
        <LoadingSpinner />
      </div>
    );

  }


  if (!movie) {

    return (
      <div
        className="watch-page"
        style={{
          alignItems:
            "center",
          justifyContent:
            "center",
          flexDirection:
            "column",
          gap: 20,
        }}
      >

        <h2>
          Movie not found
        </h2>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate(
              "/browse"
            )
          }
        >
          Back to Browse
        </button>

      </div>
    );

  }


  const poster =
    movie.poster_path;


  return (
    <div className="watch-page">

      <div className="watch-header visible">

        <button
          className="watch-back-btn"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back
        </button>


        <div className="watch-title">
          {movie.title}
        </div>


        <div />

      </div>


      <div
        className="watch-player-area"
        style={{
          backgroundImage:
            poster
              ? `url(${poster})`
              : "none",
          backgroundSize:
            "cover",
          backgroundPosition:
            "center",
        }}
      >

        <div
          className="watch-placeholder"
        >

          <div className="watch-placeholder-overlay" />


          <div className="watch-placeholder-content">

            <div className="watch-placeholder-icon">
              🎬
            </div>


            <h2>
              {movie.title}
            </h2>


            <p>
              Full movie streaming
              is not available in
              this frontend demo.
            </p>


            <p className="watch-disclaimer">
              OMDb provides movie
              information and
              posters, but it does
              not provide licensed
              full-movie streaming
              files.
            </p>


            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  `/movie/${id}`
                )
              }
            >
              View Movie Details
            </button>


            <button
              className="btn btn-outline"
              onClick={() =>
                navigate(-1)
              }
            >
              ← Go Back
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}