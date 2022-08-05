// Get data and render to UI into section1
export const renderList = function (data) {
  let list = data;
  console.log(list);

  let sectionList = document.getElementById("section1-list");
  const section1Div = document.getElementById("section1-div");
  // if (sectionList != undefined) sectionList.remove();
  if (document.body.contains(sectionList)) {
    sectionList.remove();
    console.log("ELEMENT DELETED");
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
  }
};
