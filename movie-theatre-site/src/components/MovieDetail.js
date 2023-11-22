import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [theatreShowtimes, setTheatreShowtimes] = useState({});
  const [expandedTheatreId, setExpandedTheatreId] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`/movies/${movieId}`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch showtimes for the movie
        const showtimesResponse = await fetch(`/showtimes?movieid=${movieId}`);
        const showtimesData = await showtimesResponse.json();

        // Organize showtimes by theatre
        let theatreShowtimesMap = {};
        for (const showtime of showtimesData) {
          const screenResponse = await fetch(`/screens/${showtime.screen_id}`);
          const screenData = await screenResponse.json();
          const theatreId = screenData.theatre_id;

          if (!theatreShowtimesMap[theatreId]) {
            const theatreResponse = await fetch(`/theatres/${theatreId}`);
            const theatreData = await theatreResponse.json();
            theatreShowtimesMap[theatreId] = {
              theatreName: theatreData.theatreName,
              city: theatreData.city,
              showtimes: [],
            };
          }
          theatreShowtimesMap[theatreId].showtimes.push(showtime);
        }

        setTheatreShowtimes(theatreShowtimesMap);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const toggleShowtimes = (theatreId) => {
    setExpandedTheatreId(expandedTheatreId === theatreId ? null : theatreId);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail">
      {/* Movie information */}
      <div className="movie-tile1">
        <img src={movie.img} alt={movie.title} className="movie-image" />
        <div className="movie-info">
          <h2>{movie.movieName}</h2>
          <p>Status: {movie.status}</p>
          <p className="description">Description: {movie.description}</p>
        </div>
      </div>
      {/* Theatres and Showtimes information */}
      <div className="theatre-list">
        <h3>Theatres showing this movie:</h3>
        {Object.keys(theatreShowtimes).length ? (
          Object.entries(theatreShowtimes).map(([theatreId, theatreData]) => (
            <div key={theatreId} className="theatre">
              <button
                onClick={() => toggleShowtimes(theatreId)}
                className="theatre-name"
              >
                {theatreData.theatreName} - {theatreData.city}
                <span className="arrow">
                  {expandedTheatreId === theatreId ? "▲" : "▼"}
                </span>
              </button>
              {expandedTheatreId === theatreId && (
                <div className="showtimes1">
                  {theatreData.showtimes.map((showtime, index) => (
                    <span key={index} className="showtime">
                      {showtime.showStartTime}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No theaters available for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
