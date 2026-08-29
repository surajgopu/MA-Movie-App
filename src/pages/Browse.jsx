// src/pages/Browse.jsx

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import Footer from "../components/Footer";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMoviesByGenre,
} from "../services/movieApi";


const ROWS = [

  {
    title: "Featured Movies",
    fn: () =>
      getTrendingMovies(),
  },

  {
    title: "Popular Movies",
    fn: () =>
      getPopularMovies(),
  },

  {
    title: "Top Movie Picks",
    fn: () =>
      getTopRatedMovies(),
  },

  {
    title: "Latest Picks",
    fn: () =>
      getUpcomingMovies(),
  },

  {
    title: "Romantic Movies",
    fn: () =>
      getNowPlayingMovies(),
  },

  {
    title: "Action Movies",
    fn: () =>
      getMoviesByGenre(
        "action"
      ),
  },

  {
    title: "Comedy Movies",
    fn: () =>
      getMoviesByGenre(
        "comedy"
      ),
  },

  {
    title: "Horror Movies",
    fn: () =>
      getMoviesByGenre(
        "horror"
      ),
  },

  {
    title: "Drama Movies",
    fn: () =>
      getMoviesByGenre(
        "drama"
      ),
  },

  {
    title: "Adventure Movies",
    fn: () =>
      getMoviesByGenre(
        "adventure"
      ),
  },

];


export default function Browse() {

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

      <Hero />


      <main
        style={{
          paddingBottom: 40,
        }}
      >

        {ROWS.map(
          (row) => (
            <MovieRow
              key={row.title}
              title={row.title}
              fetchFn={row.fn}
            />
          )
        )}

      </main>


      <Footer />

    </div>
  );
}