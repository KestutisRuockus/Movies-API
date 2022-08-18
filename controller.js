import * as model from "./model.js";
import * as view from "./view.js";

let page = 1; // from which page get list
let trendingSlidesIndex = 0; // used to show/get another movie slide
let genreValue = ""; // genre ID. Used to go trhough genres pages
let isGenreList = false; // to know or pagination buttons should be used. Trending list does not have pagination.

// get trending movies list. Used to show slides in section3 at the page load
const trendingMoviesList = await model.getTrendingMovies();

// navbar buttons
const btnSearch = document.getElementById("btn-search");
const btnNextPage = document.getElementById("next-page");
const btnPreviousPage = document.getElementById("previous-page");
const btnTrending = document.getElementById("btn-trending");
const btnHome = document.getElementById("btn-home");
const selectGenre = document.getElementById("navbar-genre");
const closeMovieWindow = document.getElementById("close-movie-info");
const btnMovieWindowWatchlist = document.getElementById("movie-info-watchlist");
const btnLoadWatchlist = document.getElementById("watchlist");

// section3 - top trending slides
let btnSlideLeft = document.getElementById("arrow-left");
let btnSlideRight = document.getElementById("arrow-right");

// start page
view.homePage();

// load trending slide - section3
view.trendingMoviesSlide(trendingMoviesList, trendingSlidesIndex);

// get genre list by selected dropdown option and render to UI in 'section1'
//@genreValue - this is id of genre
const loadGenreList = async function (genreValue) {
  isGenreList = true;
  if (genreValue === "") {
    genreValue = selectGenre.value;
  }
  const list = await model.getMoviesByGenre(genreValue, page);
  view.renderList(list, page, true);
  document.getElementById("section3").style.visibility = "visible";
};

// get movies list by search query and render to the UI in 'section1'
const loadList = async function () {
  const list = await model.searchMovies(page);
  view.renderList(list, page, true);
};

// Search for the movies
btnSearch.addEventListener("click", function () {
  page = 1; // get back to deafault page number
  selectGenre.selectedIndex = 0;
  isGenreList = false;
  loadList();
});

// Go to the next page of list
btnNextPage.addEventListener("click", function () {
  page++; // incrase page
  if (isGenreList !== true) {
    loadList();
  } else {
    loadGenreList(genreValue);
  }
});

// Go to the previous page of list
btnPreviousPage.addEventListener("click", function () {
  page--; // dearease page
  if (isGenreList !== true) {
    loadList();
  } else {
    loadGenreList(genreValue);
  }
});

// Show Top 20 Trending movies
btnTrending.addEventListener("click", async function () {
  selectGenre.selectedIndex = 0;
  const list = await model.getTrendingMovies();
  view.renderList(list, page, false);
});

// return to page to starting position
btnHome.addEventListener("click", function () {
  page = 1;
  trendingSlidesIndex = 0;
  genreValue = "";
  selectGenre.selectedIndex = 0;
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

// Get movies list filtered by genre
selectGenre.addEventListener("change", async function () {
  page = 1;
  let sectionName = selectGenre.options[selectGenre.selectedIndex].text;
  // if user select "SELECT GENRE" option in dropdown list then refresh page - clear everything
  if (sectionName === "SELECT GENRE") {
    view.homePage();
    return;
  }

  loadGenreList(genreValue);
});

// close 'section2' window (window where all movie info showed) on 'X' button
document.addEventListener("click", (e) => {
  if (e.target === closeMovieWindow) {
    document.getElementById("section2").style.visibility = "hidden";
  }
});

// button in 'section2' (window where all movie info showed)
// add movie to localstorage or delete it from localstorage if was saved before
btnMovieWindowWatchlist.addEventListener("click", function (e) {
  // if it is marked/saved then delete from localsotrage
  if (localStorage.getItem(e.target.value)) {
    model.deleteMovieFromWatchlist(e.target.value);
    view.setMovieUnmarked();
    // if it is not marked/saved then save in localsotrage
  } else {
    model.addToWatchlist(e.target.value);
    view.setMovieMarked();
  }
});

// Render marked/saved movies list in 'section1' from localStorage
btnLoadWatchlist.addEventListener("click", function () {
  const list = model.getAllMoviesFromLocalstorage();
  if (list.movies.length === 0) {
    view.homePage();
    alert("There are no movies in watchlist.");
  } else {
    view.renderList(list, page, false, true);
  }
});
