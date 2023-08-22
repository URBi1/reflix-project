import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md'; // Импортируйте иконку
import './Navbar.css'; 

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <nav className="navbar">
            {location.pathname !== "/" && (
                <button className="back-button" onClick={handleBack}>
                    <MdArrowBack />
                </button>
            )}
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/catalog">Catalog</Link></li>
            </ul>
            <div className="nav-logo">
                <img src="https://i.pinimg.com/736x/bc/9b/cb/bc9bcb79c3e62dbf645a5cb2809c1f4c.jpg" alt="Logo" />
            </div>
        </nav>
    );
};

export default Navbar;
