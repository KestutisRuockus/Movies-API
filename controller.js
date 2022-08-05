import { API_URL, API_KEY } from "./config.js";
import * as model from "./model.js";
import * as view from "./view.js";

const btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", async function () {
  let list = await model.getQuery();
  console.log(list);
  view.renderList(list);
});
