// src/services/movieApi.js

import { API_KEY, BASE_URL } from "../config/api";


// ============================================================
// BASIC API REQUEST
// ============================================================

async function fetchFromAPI(params = {}) {
  if (!API_KEY) {
    throw new Error(
      "OMDb API key is missing. Add VITE_OMDB_API_KEY to your .env file."
    );
  }

  const url = new URL(BASE_URL);

  url.searchParams.set("apikey", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(
      data.Error || "Movie request failed."
    );
  }

  return data;
}


// ============================================================
// SEARCH MOVIES
// ============================================================

export async function searchMovies(
  query,
  page = 1
) {
  if (!query || !query.trim()) {
    return {
      results: [],
      total_results: 0,
      total_pages: 0,
    };
  }

  const data = await fetchFromAPI({
    s: query.trim(),
    type: "movie",
    page,
  });

  return {
    results: (data.Search || []).map(
      normalizeMovie
    ),

    total_results: Number(
      data.totalResults || 0
    ),

    total_pages: Math.min(
      Math.ceil(
        Number(data.totalResults || 0) / 10
      ),
      100
    ),
  };
}


// ============================================================
// GET MOVIE DETAILS
// ============================================================

export async function getMovieDetails(
  imdbID
) {
  const data = await fetchFromAPI({
    i: imdbID,
    plot: "full",
  });

  return normalizeMovie(data);
}


// ============================================================
// NORMALIZE OMDb RESPONSE
// ============================================================
//
// This converts OMDb's format into the format
// used by the MA React application.
//
// ============================================================

export function normalizeMovie(movie) {
  if (!movie) {
    return null;
  }

  const imdbRating =
    movie.imdbRating &&
    movie.imdbRating !== "N/A"
      ? Number(movie.imdbRating)
      : 0;

  const poster =
    movie.Poster &&
    movie.Poster !== "N/A"
      ? movie.Poster
      : null;

  const genres =
    movie.Genre &&
    movie.Genre !== "N/A"
      ? movie.Genre
          .split(",")
          .map((genre, index) => ({
            id: `${movie.imdbID}-genre-${index}`,
            name: genre.trim(),
          }))
      : [];

  const actors =
    movie.Actors &&
    movie.Actors !== "N/A"
      ? movie.Actors
          .split(",")
          .map((actor) => actor.trim())
      : [];

  return {
    // IDs
    id: movie.imdbID || "",
    imdbID: movie.imdbID || "",

    // Basic information
    title:
      movie.Title &&
      movie.Title !== "N/A"
        ? movie.Title
        : "Unknown Movie",

    Title:
      movie.Title &&
      movie.Title !== "N/A"
        ? movie.Title
        : "Unknown Movie",

    Year:
      movie.Year &&
      movie.Year !== "N/A"
        ? movie.Year
        : "",

    // Images
    poster_path: poster,

    // OMDb doesn't provide a backdrop.
    // We use the poster as a fallback.
    backdrop_path: poster,

    Poster: poster,

    // Date/year
    release_date:
      movie.Released &&
      movie.Released !== "N/A"
        ? movie.Released
        : movie.Year || "",

    // Rating
    vote_average: imdbRating,

    imdbRating,

    // Description
    overview:
      movie.Plot &&
      movie.Plot !== "N/A"
        ? movie.Plot
        : "",

    Plot:
      movie.Plot &&
      movie.Plot !== "N/A"
        ? movie.Plot
        : "",

    // Runtime
    runtime:
      movie.Runtime &&
      movie.Runtime !== "N/A"
        ? movie.Runtime
        : "",

    // Genres
    genres,

    Genre:
      movie.Genre &&
      movie.Genre !== "N/A"
        ? movie.Genre
        : "",

    // Language
    original_language:
      movie.Language &&
      movie.Language !== "N/A"
        ? movie.Language
        : "",

    Language:
      movie.Language &&
      movie.Language !== "N/A"
        ? movie.Language
        : "",

    // People
    actors,

    Actors: actors,

    director:
      movie.Director &&
      movie.Director !== "N/A"
        ? movie.Director
        : "",

    Director:
      movie.Director &&
      movie.Director !== "N/A"
        ? movie.Director
        : "",

    writer:
      movie.Writer &&
      movie.Writer !== "N/A"
        ? movie.Writer
        : "",

    Writer:
      movie.Writer &&
      movie.Writer !== "N/A"
        ? movie.Writer
        : "",

    // Additional information
    country:
      movie.Country &&
      movie.Country !== "N/A"
        ? movie.Country
        : "",

    Country:
      movie.Country &&
      movie.Country !== "N/A"
        ? movie.Country
        : "",

    awards:
      movie.Awards &&
      movie.Awards !== "N/A"
        ? movie.Awards
        : "",

    Awards:
      movie.Awards &&
      movie.Awards !== "N/A"
        ? movie.Awards
        : "",

    ratings:
      movie.Ratings || [],

    imdbVotes:
      movie.imdbVotes &&
      movie.imdbVotes !== "N/A"
        ? movie.imdbVotes
        : "",

    type:
      movie.Type || "movie",

    status: "",

    tagline: "",

    // Keep original data available
    raw: movie,
  };
}


// ============================================================
// HOME PAGE DATA
// ============================================================
//
// IMPORTANT:
// OMDb does not provide TMDB-style endpoints such as:
//
// /trending
// /popular
// /top_rated
// /upcoming
// /now_playing
// /discover
//
// Therefore we build homepage rows using OMDb searches.
// ============================================================


// Featured movies
export async function getTrendingMovies() {
  return searchMovies("avengers", 1);
}

export async function getPopularMovies() {
  return searchMovies("batman", 1);
}

export async function getTopRatedMovies() {
  return searchMovies("spider", 1);
}

export async function getUpcomingMovies() {
  return searchMovies("2026", 1);
}

export async function getNowPlayingMovies() {
  return searchMovies("love", 1);
}


// ============================================================
// MOVIES BY SEARCH CATEGORY
// ============================================================

export async function getMoviesByGenre(
  searchTerm,
  page = 1
) {
  return searchMovies(
    searchTerm,
    page
  );
}


// ============================================================
// SIMILAR MOVIES
// ============================================================
//
// OMDb does not have a true "similar movies"
// endpoint.
//
// We use the movie's first genre as a search
// term where possible.
// ============================================================

export async function getSimilarMovies(
  movieOrId,
  page = 1
) {
  let movie = movieOrId;

  if (
    typeof movieOrId === "string"
  ) {
    try {
      movie =
        await getMovieDetails(
          movieOrId
        );
    } catch {
      return {
        results: [],
        total_results: 0,
        total_pages: 0,
      };
    }
  }

  let searchTerm = "movie";

  if (
    movie?.Genre
  ) {
    searchTerm =
      movie.Genre
        .split(",")[0]
        .trim();
  } else if (
    movie?.genres?.length
  ) {
    searchTerm =
      movie.genres[0].name;
  }

  return searchMovies(
    searchTerm,
    page
  );
}


// ============================================================
// CREDITS
// ============================================================

export async function getMovieCredits(
  imdbID
) {
  const movie =
    await getMovieDetails(
      imdbID
    );

  const cast =
    movie.actors?.map(
      (name, index) => ({
        id: `${imdbID}-actor-${index}`,
        name,
        character: "",
        profile_path: null,
      })
    ) || [];

  const crew =
    movie.director
      ? [
          {
            id: `${imdbID}-director`,
            name: movie.director,
            job: "Director",
          },
        ]
      : [];

  return {
    cast,
    crew,
  };
}


// ============================================================
// VIDEOS
// ============================================================
//
// OMDb does not provide YouTube trailer
// information like TMDB does.
//
// Return an empty result so the Watch page
// can gracefully show the demo player.
// ============================================================

export async function getMovieVideos() {
  return {
    results: [],
  };
}


// ============================================================
// IMAGE HELPERS
// ============================================================

export function getPosterUrl(
  poster
) {
  if (
    !poster ||
    poster === "N/A"
  ) {
    return null;
  }

  // OMDb already gives us the complete
  // poster URL.
  return poster;
}


export function getBackdropUrl(
  poster
) {
  if (
    !poster ||
    poster === "N/A"
  ) {
    return null;
  }

  // OMDb does not provide backdrop images.
  // Use the poster as a background.
  return poster;
}