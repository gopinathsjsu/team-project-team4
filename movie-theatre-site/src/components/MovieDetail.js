import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Stack, CardBody, Heading, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Header from "./Header";

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
        for (let i = 0; i < theatresData.length; i++) {
          const showsData = await fetch(
            `/movies?movieid=${movieId}&theatreid=${theatresData[i]._id}`
          );
          const shows = await showsData.json();
          console.log(shows);
          theatreShowtimesMap[theatresData[i]._id] = {
            theatreName: theatresData[i].theatreName,
            city: theatresData[i].city,
            showtimes: shows,
          };
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
      <Header />
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={movie.img}
          alt={movie.movieName}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{movie.movieName}</Heading>
            <Text>Status:{movie.status}</Text>
            <Text py="2">{movie.description}</Text>
          </CardBody>
        </Stack>
      </Card>
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
                    <Link
                      key={index}
                      to={`/seating/${showtime._id}`}
                      className="showtime-link"
                    >
                      <span>{showtime.showStartTime}</span>
                    </Link>
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
