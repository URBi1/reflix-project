import React from 'react';
import { Link } from 'react-router-dom';
import './Movie.css'

const Movie = ({ movie, onRent, onUnrent, rented  }) => {
    return (
        <div className="movie-container">
            <Link to={`/movies/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </Link>
            <h3>{movie.title}</h3>
            {rented ? 
                <button onClick={() => onUnrent(movie)}>-</button> : 
                <button onClick={() => onRent(movie)}>+</button>
            }
        </div>
    );
}

export default Movie;
