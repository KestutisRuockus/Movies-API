import { POSTER_URL } from "./config.js";

let imgSize; // going to be used to set poster size
let posterUrl; // if there poster url does not exist then show 'noImage" img
let section1Name = document.getElementById("section1-name"); // Show what kind of list is represented
let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");
let section3 = document.getElementById("section3");
let sectionList = document.getElementById("section1-list");

// Get data and render to UI into section1
// @data - returned movies info
// @page - get current page number
// @isPaginationRequired - or pagination buttons container must be visible
export const renderList = function (data, page, isPaginationRequired = false) {
  imgSize = "w154";

  // check or there is any data returned
  if (data === undefined) {
    return;
  }

  const section1Div = document.getElementById("section1-div");

  // if it is not first search made we need to remove/clear 'section1' - remove/clear list before rendering other list
  if (document.body.contains(sectionList)) {
    sectionList.remove();
  }
  sectionList = document.createElement("ul");
  sectionList.setAttribute("id", "section1-list");
  section1Div.appendChild(sectionList);

  const totalPages = data.totalPages; // how many pages founded
  const totalResults = data.totalResults; // how many results received
  let listLength = 20; // deafault page length

  if (totalPages === page) {
    listLength = totalResults % listLength; // if page is not full (not 20 items) then set length of left items
  }

  // if it is first page - hide 'previous page' button
  if (page === 1) {
    document.getElementById("previous-page").style.visibility = "hidden";
  } else {
    document.getElementById("previous-page").style.visibility = "visible";
  }
  // if it is last page - hide 'next page' button
  if (page === totalPages) {
    document.getElementById("next-page").style.visibility = "hidden";
  } else {
    document.getElementById("next-page").style.visibility = "visible";
  }

  // Creates elements and appends them
  for (let i = 0; i < listLength; i++) {
    const section1Movie = document.createElement("div");
    section1Movie.setAttribute("id", "section1-movie");
    const img = document.createElement("img");

    // Check or poster url exist and set url path
    if (data.movies[i].posterPath === null) {
      posterUrl = "./img/noImage.png";
    } else {
      posterUrl = `${POSTER_URL}${imgSize}${data.movies[i].posterPath}`;
    }

    img.setAttribute("src", posterUrl);
    const li = document.createElement("li");
    li.setAttribute("id", data.movies[i].id);
    const liText = document.createTextNode(data.movies[i].title);

    sectionList.appendChild(section1Movie);
    section1Movie.appendChild(img);
    section1Movie.appendChild(li);
    li.appendChild(liText);
    document.getElementById("page-number").textContent = `Page: ${page}`;
  }

  // make section1 visible
  section1.style.visibility = "visible";

  // check or pagination buttons must be shown
  if (isPaginationRequired === true) {
    document.getElementById("pages-container").style.visibility = "visible";
    section3.style.visibility = "visible";
  } else {
    section1Name.textContent = "";
    document.getElementById("pages-container").style.visibility = "hidden";
    document.getElementById("next-page").style.visibility = "hidden";
    document.getElementById("previous-page").style.visibility = "hidden";
    section3.style.visibility = "hidden";
  }
};

// refresh page to starting position
export const homePage = function () {
  section1.style.visibility = "hidden";
  section3.style.visibility = "visible";
  document.getElementById("pages-container").style.visibility = "hidden";
  document.getElementById("next-page").style.visibility = "hidden";
  document.getElementById("previous-page").style.visibility = "hidden";
  document.getElementById("input-search").value = "";
  if (document.body.contains(sectionList)) {
    sectionList.remove();
  }
};

// On page load. In section3 renders trending movies
// @list - trending movies object/info
// @trendingListindex - number which movie show in slides. Number controlled by two arrows in slides.
export const trendingMoviesSlide = function (list, TrendingListindex) {
  imgSize = "w500";
  const poster = document.getElementById("slide-poster");
  const title = document.getElementById("trending-slide-title");
  const movieTopPlace = document.getElementById("trending-movie-number");

  // Check or poster url exist and set url path
  if (list.movies[TrendingListindex].posterPath === null) {
    posterUrl = "./img/noImage.png";
  } else {
    posterUrl = `${POSTER_URL}${imgSize}${list.movies[TrendingListindex].posterPath}`;
  }

  title.textContent = list.movies[TrendingListindex].title;
  movieTopPlace.textContent = `NUMBER: ${TrendingListindex + 1}`;
  poster.setAttribute("src", posterUrl);
};
