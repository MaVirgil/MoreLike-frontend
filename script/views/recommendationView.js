import {API_BASE_URL, render} from "../app.js";
import {apiRequest} from "../apiRequest.js";

export const recommendationView = {

    getHtml(data) {
        return `
            <div class="container">
                <h3>If you liked <i>${data.based_on}</i>, you might enjoy:</h3>
                <div id="recommended-movies-container">
                </div>
            </div>
        `
    },

    init(data) {
        this.attachListeners();
    },

    attachListeners() {
        //Attach listeners here
    }
}