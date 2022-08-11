import { API_URL, API_KEY } from "./config.js";

// Get movies list by search input
// @page - from which page get movies. API returns 20 movies per page
// @return - movies results
export const searchMovies = async function (page) {
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
        console.log(data);
        if (Object.keys(data.results).length === 0) {
          alert(`Nothing has been found! \r\n
          Please try again!`);
          return;
        }
        // put data into object
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
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    return list;
  }
};
