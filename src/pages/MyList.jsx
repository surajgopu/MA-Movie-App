// src/pages/MyList.jsx

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";

import {
  useMyList,
} from "../context/MyListContext";


export default function MyList() {

  const {
    myList,
  } = useMyList();

  const navigate =
    useNavigate();


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
          paddingTop: 90,
          paddingBottom: 60,
        }}
      >

        <div
          style={{
            padding:
              "0 4%",
          }}
        >

          <h1
            style={{
              fontSize:
                "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight:
                800,
              marginBottom:
                8,
            }}
          >
            My List
          </h1>


          {myList.length >
            0 && (

            <p
              style={{
                color:
                  "var(--text-secondary)",
                marginBottom:
                  32,
              }}
            >
              {myList.length} title
              {myList.length !==
              1
                ? "s"
                : ""}{" "}
              saved
            </p>

          )}

        </div>


        {myList.length >
        0 ? (

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 12,
              padding:
                "0 4%",
            }}
          >

            {myList.map(
              (movie) => (

                <MovieCard
                  key={
                    movie.imdbID ||
                    movie.id
                  }
                  movie={movie}
                />

              )
            )}

          </div>

        ) : (

          <div className="empty-state">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              Your list is empty
            </h3>

            <p>
              Start adding movies
              you want to watch later.
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  "/browse"
                )
              }
            >
              Browse Movies
            </button>

          </div>

        )}

      </main>


      <Footer />

    </div>
  );
}