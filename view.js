// Get data and render to UI into section1
// @data - returned movies info
// @page - get current page number
export const renderList = function (data, page) {
  let list = data;
  if (data === undefined) {
    // check or there is any data returned
    return;
  }

  // set pages buttons container visible
  document.getElementById("pages-container").style.visibility = "visible";

  let sectionList = document.getElementById("section1-list");
  const section1Div = document.getElementById("section1-div");

  if (document.body.contains(sectionList)) {
    sectionList.remove();
  }
  sectionList = document.createElement("ul");
  sectionList.setAttribute("id", "section1-list");
  section1Div.appendChild(sectionList);

  // Creates elements and appends them
  for (let i = 0; i < Object.keys(list).length; i++) {
    const section1Movie = document.createElement("div");
    section1Movie.setAttribute("id", "section1-movie");
    const img = document.createElement("img");
    img.setAttribute("src", "./img/noImage.png");
    const li = document.createElement("li");
    li.setAttribute("id", list[i].id);
    const liText = document.createTextNode(list[i].title);

    sectionList.appendChild(section1Movie);
    section1Movie.appendChild(img);
    section1Movie.appendChild(li);
    li.appendChild(liText);
    document.getElementById("page-number").textContent = `Page: ${page}`;
  }
};
