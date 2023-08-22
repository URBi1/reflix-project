import React, { useState, useEffect } from 'react';
import { fetchMovieTrailer } from '../../../utils/tmdbAPI';

const MovieTrailer = ({ movieId }) => {
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        const getTrailer = async () => {
            const trailer = await fetchMovieTrailer(movieId);
            setTrailerUrl(trailer);
        };

        getTrailer();
    }, [movieId]);

    if (!trailerUrl) return null;

    // Преобразование стандартной YouTube ссылки в ссылку для встраивания
    const embedUrl = trailerUrl.replace("watch?v=", "embed/");

    return (
        <div>
            <h3>Trailer</h3>
            <iframe 
                width="560" 
                height="315" 
                src={embedUrl} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
        </div>
    );
}

export default MovieTrailer;
