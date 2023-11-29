import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Showtimes = () => {
  const [moviesWithShowtimes, setMoviesWithShowtimes] = useState([]);

  useEffect(() => {
    const fetchMoviesAndShowtimes = async () => {
      try {
        // Fetch all movies
        const moviesResponse = await axios.get('/movies');
        const movies = moviesResponse.data;

        // Parallelize fetching theaters and showtimes for each movie
        const moviesPromises = movies.map(async movie => {
          const theatresResponse = await axios.get(`/movies?movieid=${movie._id}`);
          const theatres = theatresResponse.data;

          // Fetch showtimes for each theatre in parallel
          const theatrePromises = theatres.map(async theatre => {
            const showtimesResponse = await axios.get(`/movies?movieid=${movie._id}&theatreid=${theatre._id}`);
            theatre.showtimes = showtimesResponse.data;
            return theatre;
          });

          movie.theatres = await Promise.all(theatrePromises);
          return movie;
        });

        const combinedData = await Promise.all(moviesPromises);
        setMoviesWithShowtimes(combinedData);
      } catch (error) {
        console.error("Error fetching movies and showtimes:", error);
      }
    };

    fetchMoviesAndShowtimes();
  }, []);

  return (
    <div>
      <h1>All Movies and Showtimes</h1>
      {moviesWithShowtimes.map(movie => (
        <div key={movie._id}>
          <h2>{movie.movieName}</h2>
          <img src={movie.img} alt={movie.movieName} style={{ maxWidth: '200px' }} />
          {movie.theatres.map(theatre => (
            <div key={theatre._id}>
              <h3>{theatre.theatreName}</h3>
              {theatre.showtimes.map(showtime => (
                <p key={showtime._id}>{showtime.showStartTime}</p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Showtimes;
