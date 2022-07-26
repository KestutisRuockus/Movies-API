import { API_URL, API_KEY } from "./config.js";

// put data into object. This function used for search, for getting trending movies
// @data - received object by query
// return - object
export const getInfo = function (data) {
  let list = {
    movies: {
      id: "",
      title: "",
      overview: "",
      posterPath: "",
      releaseDate: "",
      voteRating: "",
      genre: [],
    },
    totalPages: "",
    totalResults: "",
  };

  list.totalPages = data.total_pages;
  list.totalResults = data.total_results;
  list.movies = data.results.map((results) => {
    return {
      id: results.id,
      title: results.title,
      overview: results.overview,
      posterPath: results.poster_path,
      releaseDate: results.release_date,
      voteRating: results.vote_average,
      genre: results.genre_ids,
    };
  });

  return list;
};

// Get movies list by search input
// @page - from which page get movies. API returns 20 movies per page
// @return - movies results
export const searchMovies = async function (page) {
  let list;
  const inputSearch = document.getElementById("input-search"); // search input
  let query = inputSearch.value;

  let api = `${API_URL}search/movie${API_KEY}&language=en-US&query=${query}&include_adult=false&page=${page}`; // query to API - themoviedb.org
  api = api.replaceAll(" ", "%20"); // symbol '%20' required to get correct query when user use more than one word in search. Replaces users empty inputs/strings into "%20". EXAMPLE: 'two words' into 'two%20words'

  // checks or input is not empty. If query exist it puts results into Object
  if (query === "" || query === undefined) {
    alert(`Movie name field can't be empty! \r\n
    Please try again!`);
    return;
  } else {
    await fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (Object.keys(data.results).length === 0) {
          alert(`Nothing has been found! \r\n
          Please try again!`);
          inputSearch.value = "";
          return;
        }
        list = getInfo(data);

        // put data into object
        // list.totalPages = data.total_pages;
        // list.totalResults = data.total_results;
        // list.movies = data.results.map((results) => {
        //   return {
        //     id: results.id,
        //     title: results.title,
        //     overview: results.overview,
        //     posterPath: results.poster_path,
        //     releaseDate: results.release_date,
        //     voteRating: results.vote_average,
        //     genre: results.genre_ids,
        //   };
        // });
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    return list;
  }
};

// Get top 20 trending movies list of the week
// return - list of movies
export const getTrendingMovies = async function () {
  let api = `${API_URL}trending/movie/week${API_KEY}`;
  let list;

  await fetch(api)
    .then((response) => response.json())
    .then((data) => {
      list = getInfo(data);
    });
  return list;
};

// get filtered movies by selected genry
//@genre = movie genre id
//@page - which page select. API returns 20 items per page
//@return - filtered list
export const getMoviesByGenre = async function (genre, page) {
  let list;

  let api = `${API_URL}discover/movie${API_KEY}&with_genres=${genre}&page=${page}`;

  await fetch(api)
    .then((response) => response.json())
    .then((data) => {
      list = getInfo(data);
    });

  return list;
};

// get movie object and add to localstorage
//@movieId - current movie info by his id.
export const addToWatchlist = async function (movieId) {
  let movie = {
    id: "",
    title: "",
    overview: "",
    posterPath: "",
    releaseDate: "",
    voteRating: "",
    genre: [],
  };

  const api = `${API_URL}movie/${movieId}${API_KEY}&language=en-US`;

  await fetch(api)
    .then((response) => response.json())
    .then((data) => {
      movie.id = data.id;
      movie.title = data.title;
      movie.overview = data.overview;
      movie.posterPath = data.poster_path;
      movie.releaseDate = data.release_date;
      movie.voteRating = data.vote_average;
      movie.genre = data.genres;
    });

  // setItem in loacalstorage
  localStorage.setItem(movie.id, JSON.stringify(movie));
};

// delete item from localstorage
//@movieId - current movie ID
export const deleteMovieFromWatchlist = function (movieId) {
  localStorage.removeItem(movieId);
};

// load all movies from localstorage
export const getAllMoviesFromLocalstorage = function () {
  let list = {
    movies: [],
  };
  let keysList = [];

  let movies = Object.keys(localStorage);
  let i = movies.length;

  // get all keys into list from localstorage
  while (i--) {
    keysList.push(movies[i]);
  }

  // get all values by keys from localstorage
  for (let item in keysList) {
    list.movies.push(JSON.parse(localStorage.getItem(keysList[item])));
  }
  return list;
};
