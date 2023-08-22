import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../utils/tmdbAPI';
import MovieTrailer from './MovieTrailer/MovieTrailer';
import './MovieDetail.css'; // Добавляем стили

const MovieDetail = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () => {
            const details = await fetchMovieDetails(movieId);
            setMovie(details);
        };

        getMovieDetails();
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    const { poster_path, title, release_date, overview } = movie;

    return (
        <div className="movie-detail-container">
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            <h2>{title}</h2>
            <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            <p>{overview}</p>
            <MovieTrailer movieId={movieId} />
        </div>
    );
}

export default MovieDetail;
