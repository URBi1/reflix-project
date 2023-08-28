import React, { useState, useEffect } from 'react';
import { fetchMovieGIF } from '../../utils/tmdbAPI';
import './Modal.css'

const Modal = ({ movieName, onClose}) => {

   const [gifURL, setGifURL] = useState('')

   useEffect(()=>{
    const fetchGIF = async () => {
        const data = await fetchMovieGIF(movieName);
        setGifURL(data)
        console.log(data)
    }
   
   fetchGIF()},[movieName])


    return (
        <div className="modal-window">
            <h5>Rented {movieName} Sucessfully!</h5>
            {gifURL&& <img width="50" height="auto" src={gifURL} />}
            <button onClick={onClose}>X</button>  
        </div>
    );
}

export default Modal;
