
// Showtimes.js
import React, { useState,useEffect } from "react";
import Header from "./Header";


const Showtimes = () => {
  const [showtimes,setShowtimes]= useState([]);
  useEffect(() => {
    fetch("/showtimes")
      .then((response) => response.json())
      .then((data) => {
        setShowtimes(data);
      })
      .catch((error) =>
        console.error("There was an error fetching showtimes:", error)
      );
  }, []);
  return (
      <div className="mainShow">
        <Header />
        <div>
      <h1>ShowTimes:</h1>
      <div>
        {showtimes.map((showtime) => (
          <div key={showtime._id}>
            <p>{showtime.showStartTime}</p>
          </div>
        ))}
      </div>
    </div>
      </div>
  );
};

export default Showtimes;