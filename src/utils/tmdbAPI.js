const API_KEY = '3a8c9e3d92fe572c69dbc96ec55f8844'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (searchQuery = "") => {
    try {
        let url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
        if (searchQuery) {
            url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Can't download data", error);
        return [];
    }
};



export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Can't download data", error);
        return null;
    }
};


export const fetchMovieTrailer = async (movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");

        return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

    } catch (error) {
        console.error("Can't download trailer data", error);
        return null;
    }
};

export const fetchMovieGIF = async (movieName) => {
    try {
        const APIKEY =  'yfmfJcZr8Se0Nhv25E5F8ua61va7EqOl';
        const query=movieName;
        const url = 'https://api.giphy.com/v1/gifs/search';

        const response = await fetch(`${url}?api_key=${APIKEY}&q=${query}&limit=1`);
        const data = await response.json();

        console.log(data);
        
        return data.data[0].images.fixed_height.url;
        
    } catch (error) {
        console.error("Can't download gif data", error);
        return null;
    }
};

