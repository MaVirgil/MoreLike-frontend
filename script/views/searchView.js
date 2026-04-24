import {API_BASE_URL, render} from "../app.js";
import {apiRequest} from "../apiRequest.js";

export const searchView = {

    getHtml() {
        return `
            <div class="container">
            
                <div>
                
                    <label for="movie-search">Search for a movie to get started:</label>
                    <div class="input-wrapper">
                        <input id="search-input" class="input-field" type="text" placeholder="ex. Interstellar">
                        <button id="search-btn" class="search-btn">Search</button>
                    </div>
                    
                    <div class="divider">
                        <span>or</span>
                    </div>
                    
                    <label for="imdb-search">Enter an IMDB link:</label>
                    <div class="input-wrapper">
                        <input id="imdb-input" class="input-field" type="url" placeholder="https://www.imdb.com/title/...">
                        <button id="submit-btn" class="search-btn">Submit</button>
                    </div>
                    
                </div>
            </div>
            
            <div id="result-container" class="result-container">
            </div>
        `;
    },

    init() {
        this.attachListeners();
    },

    attachListeners() {

        const searchBtnEl = document.getElementById('search-btn');
        const submitBtnEl = document.getElementById('submit-btn');

        searchBtnEl.addEventListener("click", () => this.handleSearch());
        submitBtnEl.addEventListener("click", () => this.handleImdbSearch());
    },

    async handleSearch(){
        const query = document.getElementById('search-input').value.trim();

        if (!query) {
            console.error('invalid or empty search query!');
            alert('Please enter a valid search query');
            return;
        }

        console.log(`Searching for ${query}...`);

        try {
            const apiUrl = API_BASE_URL + `/movie/search?title=${query}&page=1`;

            const response = await apiRequest(apiUrl);

            console.log(response);

            const movies = response.results.filter(movie => movie.vote_average > 0);

            console.log(movies);

            await this.updateResults(movies);
        } catch (error) {
            console.error(error);
            alert('Something went wrong, please try again later');
            render('searchView');
        }

    },

    async handleImdbSearch() {

        const imdbLink = document.getElementById('imdb-input').value.trim();

        if (!imdbLink) {
            console.error('invalid or empty search query!');
            alert('Please enter a valid IMDB link');
            return;
        }

        const imdbId = imdbLink.split("/")[4];

        try {
            const apiUrl = API_BASE_URL + `/movie/find/${imdbId}`;

            const result = await apiRequest(apiUrl);

            console.log(result);

            this.updateResults(result.movie_results);
        } catch (error) {
            console.error(error);
            alert('Something went wrong, please try again later');
            render('searchView');
        }
    },

    updateResults(movies) {
        const resultsEl = document.getElementById('result-container');

        resultsEl.innerHTML = "";

        if (!movies || movies.length === 0) {

            console.log('No results found!');

            resultsEl.innerHTML = `
                <p class="no-results-message">No results found...</p>
            `;

            return;
        }

        movies.forEach(movie => {
            const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92"
            
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img class="movie-card-poster" src="${IMAGE_BASE_URL}/${movie.poster_path}" alt="poster">
                <div class="movie-card-info">
                    <p class="movie-title">${movie.title}</p>
                    <p class="movie-release-date">Release Date: ${movie.release_date}</p>
                    <p class="movie-score">${movie.vote_average}★</p>
                    <button id="select-btn-${movie.id}" class="similar-movies-btn">Get similar movies</button>
                </div>
            `

            resultsEl.appendChild(movieCard);

            document.getElementById(`select-btn-${movie.id}`).addEventListener("click", () => this.loadRecommendedMovies(`${movie.title} (${movie.release_date.slice(0,4)})`));
        });
    },

    async loadRecommendedMovies(title) {
        console.log(`getting recommended films for title: ${title}`);

        if (!title) {
            console.error('No movie title provided');
            alert('something went wrong, please try again later');
            return;
        }

        console.log(`finding movies with similar themes to ${title}...`);

        try {
            const apiUrl = API_BASE_URL + `/recommend?query=${title}`;

            const response = await apiRequest(apiUrl);

            const data = {
                "based_on": title,
                "movies": response,
            }

            render('recommendationView', data);
        } catch (error) {
            console.error(error);
            alert('Something went wrong, please try again later');
            render('searchView');
        }
    }
}