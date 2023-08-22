import React from 'react';
import Movie from './Movie';

const RentedMovies = ({ movies, onUnrent }) => {
    return (
        <div className="rented-movies">
            <h2>Rented Movies</h2>
            <div className='movies-list'>
                {movies.map(movie => (
                    <Movie
                        key={movie.id}
                        movie={movie}
                        rented
                        onUnrent={() => onUnrent(movie)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RentedMovies;