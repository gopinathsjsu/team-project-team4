import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Image, Stack, CardBody, Heading, Text } from "@chakra-ui/react";
import {
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Header from "./Header";
import moment from 'moment';


const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [allShowtimes, setAllShowtimes] = useState({});
  const [theatreShowtimes, setTheatreShowtimes] = useState({});
  const [clonedData, setClonedData] = useState({});
  const { movieId } = useParams();

  const onSetDate = useCallback(async (event, values) => {
    event.preventDefault();
    let curdate = new Date(event.target.value);
    let date = curdate.toISOString();
    date = Number(date.slice(0, 4)+date.slice(5,7)+date.slice(8,10));
    console.log(allShowtimes);
    setClonedData(JSON.parse(JSON.stringify(allShowtimes)));
    console.log(date);
    console.log(typeof(date));
    for(let key in clonedData)
    {
      let temp = clonedData[key].showtimes;
      let shows = [];
      for(let i=0;i<temp.length;i++)
      {
        let rtdate = Number(temp[i].showDate.slice(0,4)+temp[i].showDate.slice(5,7)+temp[i].showDate.slice(8,10));
        if(rtdate==date)
        {
          shows.push(temp[i]);
        }
      }
      clonedData[key].showtimes = shows;
    }
    console.log(clonedData);
    setTheatreShowtimes(clonedData);

});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
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
          theatreShowtimesMap[theatresData[i]._id] = {
            theatreName: theatresData[i].theatreName,
            city: theatresData[i].city,
            showtimes: shows,
          };
        }
        setAllShowtimes(theatreShowtimesMap);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

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
      <h3>Theatres showing this movie:</h3>
        <input
          type="date"
          name="showDate"
          placeholder="Show Date"
          className="auth-input"
          onChange={onSetDate}
        />
      <div className="theatre-list">
        
        {Object.keys(theatreShowtimes).length ? (
          Object.entries(theatreShowtimes).map(([theatreId, theatreData]) => (
            <div key={theatreId} className="theatre">
              <Accordion allowMultiple>
                {Object.entries(theatreShowtimes).map(
                  ([theatreId, theatreData]) => (
                    <AccordionItem key={theatreId}>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            {theatreData.theatreName} {theatreData.city}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {theatreData.showtimes.map((showtime, index) => (
                          <Link
                            key={index}
                            to={`/seating-chart/${showtime._id}`} // Assuming each showtime has a unique ID
                            className="showtime-link"
                          >
                            {showtime.showStartTime}
                          </Link>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  )
                )}
              </Accordion>
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
