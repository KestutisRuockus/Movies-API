import { POSTER_URL } from "./config.js";

let imgSize; // going to be used to set poster size
let posterUrl; // if there poster url does not exist then show 'noImage" img

// Get data and render to UI into section1
// @data - returned movies info
// @page - get current page number
export const renderList = function (data, page) {
  imgSize = "w154";

  // check or there is any data returned
  if (data.totalResults === "" || data === undefined) {
    return;
  }

  // set pages buttons container visible
  document.getElementById("pages-container").style.visibility = "visible";

  let sectionList = document.getElementById("section1-list");
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
};
