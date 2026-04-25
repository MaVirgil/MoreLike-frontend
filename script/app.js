import {searchView} from "./views/searchView.js";
import {loadView} from "./views/loadView.js";
import {recommendationView} from "./views/recommendationView.js";

export const API_BASE_URL = 'https://api.morelike.mavirgil.com';
let currentView = 'searchView';
const contentEl = document.getElementById('app');

const views = {

    searchView: searchView,
    loadView: loadView,
    recommendationView: recommendationView,

};

export async function render(viewName, data = null) {
    currentView = views[viewName];
    contentEl.innerHTML = currentView.getHtml(data);
    await currentView.init(data);
}

document.addEventListener("DOMContentLoaded", () => {
    render('searchView');
});
