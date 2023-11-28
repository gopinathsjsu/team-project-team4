import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const TheatreShowings = () => {
  const [theatre, setTheatre] = useState([]);
  const [movieShowtimes, setMovieShowtimes] = useState([]);
  const [expandedMovieId, setExpandedMovieId] = useState(null);
  const { theatreId } = useParams();

  useEffect(() => {
    const fetchTheatreShowings = async () => {
      try {
        const theatreResponse = await fetch(`/theatres/${theatreId}`);
        const theatreData = await theatreResponse.json();
        setTheatre(theatreData);

        let movies = {};
        const moviesResponse = await fetch(
          `/locations/${theatre.city}?theatreid=${theatreId}`
        );
        const moviesData = await moviesResponse.json();
        for (let i = 0; i < moviesData.length; i++) {
          const movieShowsData = await fetch(
            `/locations/${theatre.city}?theatreid=${theatreId}&movieid=${moviesData[i]._id}`
          );
          const movieShows = await movieShowsData.json();
          movies[moviesData[i]._id] = {
            movie: moviesData[i],
            showtimes: movieShows,
          };
        }
        setMovieShowtimes(movies);
        console.log(movies);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTheatreShowings();
  }, [theatreId]);

  return (
    <div>
      <Header />
      {/* Theatre information */}
      <div>
        <h2>
          {theatre.theatreName} ({theatre.city})
        </h2>
      </div>
      {/* Movies and Showtimes information */}
      <div>
        {Object.keys(movieShowtimes).length ? (
          Object.entries(movieShowtimes).map(([movieId, movieData]) => (
            <div key={movieId} className="movie">
              <div className="movie-tile-with-showtimes">
                <img
                  src={movieData.movie.img}
                  alt={movieData.movie.title}
                  className="movie-image"
                />
                <div>
                  <h2>{movieData.movie.movieName}</h2>
                  <p>Status: {movieData.movie.status}</p>
                  <p>Description:</p>
                  <p>
                    {movieData.movie.description.length > 250
                      ? `${movieData.movie.description.substring(0, 200)}...`
                      : movieData.movie.description}
                  </p>
                </div>
              </div>

              <div className="showtimes1">
                {movieData.showtimes.map((showtime, index) => (
                  <span key={index} className="showtime">
                    {showtime.showStartTime}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No movies playing at this theatre.</p>
        )}
      </div>
    </div>
  );
};

export default TheatreShowings;
