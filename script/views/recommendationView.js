import {API_BASE_URL, render} from "../app.js";
import {apiRequest} from "../apiRequest.js";
import {displayError} from "../error.js";

export const recommendationView = {

    getHtml(data) {
        return `
            <div class="recommendations-container">
                <h2 class="recommendations-header">
                    If you liked <i>${data.based_on}</i>, you might enjoy:
                </h2>
                <div id="result-container" class="result-container">
           
                </div>
            </div>
        `
    },

    async init(data) {
        await this.populateRecommendedMovies(data.movies);
    },

    async populateRecommendedMovies(movies) {

        const resultContainerEl = document.getElementById('result-container');

        const moviesWithData = []

        try {
            for (const movie of movies) {
                const apiUrl = API_BASE_URL + `/movie/find/${movie.imdb_id}`;

                const response = await apiRequest(apiUrl);

                const result = response.movie_results[0];

                result.imdb_id = movie.imdb_id;

                moviesWithData.push(result);
            }
        } catch (error) {
            console.error(error);
            render('searchView');
            displayError(document.getElementById('search-container'), error.message);
        }

        moviesWithData.forEach(movie => {
            const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w154"

            const movieCardEl = document.createElement('div');
            movieCardEl.className = "movie-card";

            movieCardEl.innerHTML = `
                <img class="movie-card-poster" src="${IMAGE_BASE_URL}/${movie.poster_path}" alt="poster">
                <div class="movie-card-content">
                    <p class="movie-title">${movie.title}</p>
                    <p class="movie-release-date">${movie.release_date}</p>
                    <p class="movie-score">${movie.vote_average}★</p>
                    <p class="movie-description">${movie.overview}</p>
                    <button onclick="window.open('https://www.imdb.com/title/${movie.imdb_id}','_blank')">
                        View on IMDb
                    </button>
                </div>
            `;

            resultContainerEl.appendChild(movieCardEl);
        })

    }
}