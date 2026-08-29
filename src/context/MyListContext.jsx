// src/context/MyListContext.jsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";


const MyListContext =
  createContext(null);


export function MyListProvider({
  children,
}) {

  const [
    myList,
    setMyList,
  ] = useState([]);


  useEffect(() => {

    const stored =
      localStorage.getItem(
        "maMyList"
      );

    if (!stored) {
      return;
    }


    try {

      const parsed =
        JSON.parse(stored);

      if (
        Array.isArray(parsed)
      ) {
        setMyList(parsed);
      }

    } catch {

      localStorage.removeItem(
        "maMyList"
      );

    }

  }, []);


  const getMovieId = (
    movie
  ) => {

    return (
      movie?.imdbID ||
      movie?.id ||
      ""
    );

  };


  const addToList = (
    movie
  ) => {

    const movieId =
      getMovieId(movie);

    if (!movieId) {
      return;
    }


    setMyList(
      (previous) => {

        if (
          previous.some(
            (item) =>
              getMovieId(item) ===
              movieId
          )
        ) {
          return previous;
        }


        const updated = [
          ...previous,
          {
            ...movie,
            id: movieId,
            imdbID: movieId,
          },
        ];


        localStorage.setItem(
          "maMyList",
          JSON.stringify(
            updated
          )
        );


        return updated;

      }
    );

  };


  const removeFromList = (
    movieId
  ) => {

    setMyList(
      (previous) => {

        const updated =
          previous.filter(
            (movie) =>
              getMovieId(movie) !==
              movieId
          );


        localStorage.setItem(
          "maMyList",
          JSON.stringify(
            updated
          )
        );


        return updated;

      }
    );

  };


  const isInList = (
    movieId
  ) => {

    return myList.some(
      (movie) =>
        getMovieId(movie) ===
        movieId
    );

  };


  const toggleList = (
    movie
  ) => {

    const movieId =
      getMovieId(movie);

    if (!movieId) {
      return;
    }


    if (
      isInList(movieId)
    ) {

      removeFromList(
        movieId
      );

    } else {

      addToList(movie);

    }

  };


  return (
    <MyListContext.Provider
      value={{
        myList,
        addToList,
        removeFromList,
        isInList,
        toggleList,
      }}
    >
      {children}
    </MyListContext.Provider>
  );
}


export function useMyList() {

  const context =
    useContext(
      MyListContext
    );


  if (!context) {

    throw new Error(
      "useMyList must be used within MyListProvider"
    );

  }


  return context;
}