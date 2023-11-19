import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import Header from "./Header";

const MovieListings = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [showUpcoming, setShowUpcoming] = useState(false);

    useEffect(() => {
        fetch("/movies")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setFilteredMovies(data.filter(movie => movie.status !== "upcoming")); // Show only Finished and Showing movies initially
            })
            .catch((error) =>
                console.error("There was an error fetching movies:", error)
            );
    }, []);

    const handleUpcomingFilter = () => {
        setShowUpcoming(!showUpcoming);
        if (!showUpcoming) {
            // Show only upcoming movies
            setFilteredMovies(movies.filter(movie => movie.status === "upcoming"));
        } else {
            // Show all movies except upcoming
            setFilteredMovies(movies.filter(movie => movie.status !== "upcoming"));
        }
    };

    return (
        <div className="mainListing">
            <Header />
            <button onClick={handleUpcomingFilter} className="filter-button">
                {showUpcoming ? "Show All Movies" : "Show Upcoming Movies"}
            </button>
            <ul className="movies-list">
                {filteredMovies.map((movie) => (
                    <li key={movie._id} className="movie-tile">
                        {/* Wrap movie details in a Link component */}
                        <Link to={`/movie/${movie._id}`}> 
                            <img src={movie.img} alt={movie.movieName} className="movie-image"/></Link>
                            <div>
                                <h2>{movie.movieName}</h2>
                                <p>Status: {movie.status}</p>
                                <p>Description: {movie.description}</p>
                            </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieListings;


