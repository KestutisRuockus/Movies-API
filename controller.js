import * as model from "./model.js";
import * as view from "./view.js";

let page = 1; // from which page get list
let trendingSlidesIndex = 0; // used to show/get another movie slide

// get trending movies list. Used to show slides in section3 at the page load
const trendingMoviesList = await model.getTrendingMovies();

// navbar buttons
const btnSearch = document.getElementById("btn-search");
const btnNextPage = document.getElementById("next-page");
const btnPreviousPage = document.getElementById("previous-page");
const btnTrending = document.getElementById("btn-trending");
const btnHome = document.getElementById("btn-home");

// section3 - top trending slides
let btnSlideLeft = document.getElementById("arrow-left");
let btnSlideRight = document.getElementById("arrow-right");

// start page
view.homePage();

// load trending slide - section3
view.trendingMoviesSlide(trendingMoviesList, trendingSlidesIndex);

// get movies list by search query and render to the UI in 'section1'
const loadList = async function () {
  const list = await model.searchMovies(page);
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

// Show Top 20 Trending movies
btnTrending.addEventListener("click", async function () {
  const list = await model.getTrendingMovies();
  view.renderList(list, page, "Top 20 Trending Movies");
});

// return to page to starting position
btnHome.addEventListener("click", function () {
  page = 1;
  trendingSlidesIndex = 0;
  view.homePage();
  view.trendingMoviesSlide(trendingMoviesList, trendingSlidesIndex);
});

// section3 slides - button left
btnSlideLeft.addEventListener("click", function () {
  // check or it first index of the list. If it is first then return to the last, to index 19
  if (trendingSlidesIndex === 0) {
    trendingSlidesIndex = 19;
  } else {
    trendingSlidesIndex--;
  }
  view.trendingMoviesSlide(trendingMoviesList, trendingSlidesIndex);
});

// section3 slides - button right
btnSlideRight.addEventListener("click", function () {
  // check or it last index of the list. If it is last then return to the first, to index 0
  if (trendingSlidesIndex === 19) {
    trendingSlidesIndex = 0;
  } else {
    trendingSlidesIndex++;
  }
  view.trendingMoviesSlide(trendingMoviesList, trendingSlidesIndex);
});

// change trending movie in slide after 5 seconds
setInterval(function () {
  if (trendingSlidesIndex === 19) {
    trendingSlidesIndex = 0;
  } else {
    trendingSlidesIndex++;
  }
  view.trendingMoviesSlide(trendingMoviesList, trendingSlidesIndex);
}, 5000);
