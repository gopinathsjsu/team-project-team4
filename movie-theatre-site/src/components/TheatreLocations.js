import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const TheatreLocations = () => {
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    fetch("/theatres")
      .then((res) => res.json())
      .then((data) => setTheatres(data))
      .catch((error) =>
        console.error("There was an error fetching theatres: ", error)
      );
  }, []);

  return (
    <div>
      <Header />
      <ul>
        {theatres.map((location) =>(
            <li key={location._id}>
            <Link to={`/theatrelocations/${location._id}`}>
              {location.theatreName} ({location.city})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TheatreLocations;