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
        const movieResponse = await fetch(`/movies/${movieId}`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        let theatreShowtimesMap = {};
        const theatres = await fetch(`/movies?movieid=${movieId}`);
        const theatresData = await theatres.json();
        for(let i=0;i<theatresData.length;i++)
        {
          const showsData = await fetch(`/movies?movieid=${movieId}&theatreid=${theatresData[i]._id}`);
          const shows = await showsData.json();
          console.log(shows);
          theatreShowtimesMap[theatresData[i]._id] = {
            theatreName: theatresData[i].theatreName,
              city: theatresData[i].city,
              showtimes: shows,
          }
          
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
