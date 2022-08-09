import * as model from "./model.js";
import * as view from "./view.js";

let page = 1; // from which page get list

const btnSearch = document.getElementById("btn-search");
const btnNextPage = document.getElementById("next-page");
const btnPreviousPage = document.getElementById("previous-page");

// get movies list by search query and render to the UI in 'section1'
const loadList = async function () {
  const list = await model.getQuery(page);
  view.renderList(list, page);
};

// Search for the movies
btnSearch.addEventListener("click", function () {
  page = 1; // get back to deafault page number
  loadList();
});

// Go to the next page of list
btnNextPage.addEventListener("click", function () {
  page++; // incrase page
  loadList();
});

// Go to the previous page of list
btnPreviousPage.addEventListener("click", function () {
  page--; // dearease page
  loadList();
});
