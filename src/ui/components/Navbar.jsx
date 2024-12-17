import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

export const Navbar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);


        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [location]);

    return (
        <>
            <nav className="custom-nav-bar">
                <Link className="custom-nav-bar-brand" to="/">Podcaster</Link>
            </nav>
            <hr className="custom-nav-bar-line" />

            {isLoading && (
                <div className="loading-indicator">
                    <div className="spinner"></div>
                </div>
            )}
        </>
    );
};
