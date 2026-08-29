// src/pages/Search.jsx

import {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";

import {
  LoadingSpinner,
} from "../components/Loading";

import ErrorMessage from "../components/ErrorMessage";

import {
  searchMovies,
} from "../services/movieApi";


export default function Search() {

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();


  const q =
    searchParams.get("q") ||
    "";


  const [
    query,
    setQuery,
  ] = useState(q);


  const [
    results,
    setResults,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState(null);


  const [
    page,
    setPage,
  ] = useState(1);


  const [
    totalPages,
    setTotalPages,
  ] = useState(0);


  const [
    totalResults,
    setTotalResults,
  ] = useState(0);


  const doSearch =
    useCallback(
      async (
        term,
        pg = 1
      ) => {

        if (
          !term.trim()
        ) {

          setResults([]);
          setTotalPages(0);
          setTotalResults(0);

          return;
        }


        setLoading(true);
        setError(null);


        try {

          const data =
            await searchMovies(
              term,
              pg
            );


          if (pg === 1) {

            setResults(
              data.results ||
                []
            );

          } else {

            setResults(
              (previous) => [
                ...previous,
                ...(data.results ||
                  []),
              ]
            );

          }


          setTotalPages(
            data.total_pages ||
              0
          );


          setTotalResults(
            data.total_results ||
              0
          );

        } catch (err) {

          setError(
            err.message ||
              "Search failed."
          );

        } finally {

          setLoading(false);

        }

      },
      []
    );


  useEffect(() => {

    setPage(1);

    setQuery(q);

    doSearch(
      q,
      1
    );

  }, [
    q,
    doSearch,
  ]);


  const handleSubmit = (
    event
  ) => {

    event.preventDefault();


    const value =
      query.trim();


    if (!value) {
      return;
    }


    setSearchParams({
      q: value,
    });

  };


  const loadMore = () => {

    const nextPage =
      page + 1;

    setPage(
      nextPage
    );

    doSearch(
      q,
      nextPage
    );

  };


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


      <main
        style={{
          padding:
            "100px 4% 60px",
        }}
      >

        <form
          onSubmit={
            handleSubmit
          }
          style={{
            marginBottom:
              32,
          }}
        >

          <div
            style={{
              display:
                "flex",
              gap: 12,
              maxWidth:
                700,
            }}
          >

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
              placeholder="Search movies..."
              style={{
                flex: 1,
                padding:
                  "14px 20px",
                background:
                  "var(--surface-light)",
                border:
                  "1px solid var(--border)",
                borderRadius:
                  "var(--radius)",
                color:
                  "var(--text)",
                fontSize:
                  "1rem",
                fontFamily:
                  "inherit",
                outline:
                  "none",
              }}
              aria-label="Search movies"
              autoFocus
            />


            <button
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>

          </div>

        </form>


        {q && (
          <h2
            style={{
              fontSize:
                "1.1rem",
              fontWeight: 400,
              color:
                "var(--text-secondary)",
              marginBottom:
                24,
            }}
          >

            {totalResults > 0
              ? `Showing ${results.length} of ${totalResults.toLocaleString()} results for `
              : "No results for "}

            <span
              style={{
                color:
                  "var(--text)",
                fontWeight:
                  700,
              }}
            >
              "{q}"
            </span>

          </h2>
        )}


        {loading &&
          page === 1 && (
            <LoadingSpinner />
          )}


        {error && (
          <ErrorMessage
            message={error}
            onRetry={() =>
              doSearch(
                q,
                1
              )
            }
          />
        )}


        {!loading &&
          !error &&
          results.length >
            0 && (

            <>

              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: 12,
                }}
              >

                {results.map(
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


              {page <
                totalPages && (

                <div
                  style={{
                    textAlign:
                      "center",
                    marginTop:
                      40,
                  }}
                >

                  <button
                    className="btn btn-outline"
                    onClick={
                      loadMore
                    }
                    disabled={
                      loading
                    }
                  >
                    {loading
                      ? "Loading..."
                      : "Load More"}
                  </button>

                </div>

              )}

            </>
          )}


        {!loading &&
          !error &&
          q &&
          results.length ===
            0 && (

            <div className="empty-state">

              <div className="empty-icon">
                🔍
              </div>

              <h3>
                No results found
              </h3>

              <p>
                We couldn't find
                any movies matching
                "{q}".
              </p>

            </div>

          )}


        {!q && (

          <div className="empty-state">

            <div className="empty-icon">
              🎬
            </div>

            <h3>
              Search for movies
            </h3>

            <p>
              Search for a movie
              title to get started.
            </p>

          </div>

        )}

      </main>


      <Footer />

    </div>
  );
}