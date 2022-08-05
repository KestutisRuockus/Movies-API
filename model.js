import { API_URL, API_KEY } from "./config.js";

// Get movies list by search input
export const getQuery = async function () {
  let list = {};
  const inputSearch = document.getElementById("input-search"); // search input
  let query = inputSearch.value;

  let api = `${API_URL}search/movie${API_KEY}&language=en-US&query=${query}&include_adult=false`; // path to Database
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
        console.log(data);
        const dataLength = data.total_results; // get data list length
        for (let i = 0; i < 5; i++) {
          // i.length manually selected length - must be list.length. list length must be handled - sometimes it is to long and throws error
          list[i] = { id: data.results[i].id, title: data.results[i].title };
        }
      })
      .catch(
        (err) =>
          alert(`Nothing has been found! \r\n
           Please try again!`) + console.log(err)
      );
    console.log(list);
    return list;
  }
};
