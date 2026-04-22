import {searchView} from "./views/searchView.js";
import {loadView} from "./views/loadView.js";

export const API_BASE_URL = 'http://localhost:8080';
let currentView = 'searchView';
const contentEl = document.getElementById('app');

const views = {

    searchView: searchView,
    loadView: loadView,

};

export function render(viewName, data = null) {
    currentView = views[viewName];
    contentEl.innerHTML = currentView.getHtml(data);
    currentView.init();
}

document.addEventListener("DOMContentLoaded", () => {
    render('searchView');
});
