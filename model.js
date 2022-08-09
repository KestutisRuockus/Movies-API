import { API_URL, API_KEY } from "./config.js";

// Get movies list by search input
// @page - from which page get movies
// @return - movies data {"id", "title"}
export const getQuery = async function (page) {
  let list = {};
  const inputSearch = document.getElementById("input-search"); // search input
  let query = inputSearch.value;

  let api = `${API_URL}search/movie${API_KEY}&language=en-US&query=${query}&include_adult=false&page=${page}`; // query to API - themoviedb.org
  api = api.replaceAll(" ", "%20"); // symbol '%20' required to get correct query when user use more than on word in search. Replaces users empty inputs into "%20"

  // checks or input is not empty. If query exist it puts results into Object{"id, "title"}
  if (query === "" || query === undefined) {
    alert(`Movie name field can't be empty! \r\n
    Please try again!`);
    return;
  } else {
    await fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const totalPages = data.total_pages; // how many pages founded
        const totalResults = data.total_results; // how many results received
        let listLength = 20; // deafault page length

        if (totalPages === page) listLength = totalResults % listLength; // if page is not full (not 20 items) then set length of left items

        for (let i = 0; i < listLength; i++) {
          list[i] = {
            id: data.results[i].id,
            title: data.results[i].title,
          };
        }
      })
      .catch(() => {
        alert(`Nothing has been found! \r\n
        Please try again!`);
      });
    return list;
  }
};
