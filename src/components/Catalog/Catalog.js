import React, { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../../utils/tmdbAPI';
import RentedMovies from './RentedMovies';
import SearchBar from './SearchBar';
import Movie from './Movie';
import './Catalog.css';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Catalog = (props) => {

    const TIMEOUT_AUTO_CLOSE_MODAL = 2000;

    const [showModal,setShowModal] = useState(false)
    const [rentedMovieName,setRentedMovieName]= useState('')
    const [isRented, setIsRented] = useState([]);
    const [movies, setMovies] = useState([]);
    const user = props.user;
    const [searchQuery, setSearchQuery] = useState("");

    const loadPopularMovies = async () => {
        const popularMovies = await fetchPopularMovies(searchQuery);
        const filteredMovies = popularMovies.filter(movie =>
            !props.allUsers.some(user => user.rentedMovies.some(rentedMovie => rentedMovie.id === movie.id))
        );
        setMovies(filteredMovies);
    };

    const SEARCH_DELAY = 500; 

    useEffect(() => {
        setIsRented(user.rentedMovies.map(movie => movie.id));
        loadPopularMovies();
    }, [user]);

    useEffect(()=>{
        let timer;
        if(showModal)
        {
            timer= setTimeout(()=>{
                setShowModal(false)
            },TIMEOUT_AUTO_CLOSE_MODAL)
        }
        return () => {
            if(timer){
                clearTimeout(timer)
            }
        }
    }, [showModal])

    useEffect(() => {
        const timerId = setTimeout(() => {
            loadPopularMovies();
        }, SEARCH_DELAY);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchQuery]);

    const toggleMovieRental = (movie, isRenting) => {
        const movieAlreadyRented = user.rentedMovies.some(rentedMovie => rentedMovie.id === movie.id);
        const budgetChange = isRenting ? -10 : 10;
        
        if (user.budget + budgetChange < 0 || (isRenting && movieAlreadyRented)) {
            alert("Operation not possible.");
            return;
        }

        const updatedRentedMovies = isRenting 
            ? [...user.rentedMovies, movie]
            : user.rentedMovies.filter(rentedMovie => rentedMovie.id !== movie.id);

        const updatedUser = {
            ...user,
            rentedMovies: updatedRentedMovies,
            budget: user.budget + budgetChange
        };

        props.onUserUpdate(updatedUser);
        setIsRented(prevState => isRenting ? [...prevState, movie.id] : prevState.filter(id => id !== movie.id));
        loadPopularMovies();

        if(isRenting&&!movieAlreadyRented&&user.budget +budgetChange>=0){
             setShowModal(true)
            setRentedMovieName(movie.title)
        }

    };

    return (
        <div className="catalog-container">
            {showModal && <Modal movieName={rentedMovieName} onClose={() => setShowModal(false)} />} 
            <p>Your balance: ${user.budget}
            <Link to="/add-funds" className="add-funds-button">Add funds</Link>
            <Link to="/money-transfer" className="transfer-button">Transfer Money</Link>
            </p>
            <SearchBar searchQuery={searchQuery} onSearchChange={(e) => setSearchQuery(e.target.value)} />
            
            {user && user.rentedMovies.length > 0 && (
                <RentedMovies movies={user.rentedMovies} onUnrent={(movie) => toggleMovieRental(movie, false)} />
            )}

            <h2>Catalog</h2>
            <div className="movies-list">
                {movies.map(movie => (
                    <Movie
                        key={movie.id}
                        movie={movie}
                        rented={isRented.includes(movie.id)}
                        onRent={(movie) => toggleMovieRental(movie, true)}
                        onUnrent={(movie) => toggleMovieRental(movie, false)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Catalog;