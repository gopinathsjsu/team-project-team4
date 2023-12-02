import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";

const SeatingChart = () => {
  const [seatingLayout, setSeatingLayout] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [ticketPrice, setTicketPrice] = useState(0);
  const [movieTitle, setMovieTitle] = useState("");
  const { showtimeId } = useParams();

  useEffect(() => {
    const fetchShowtimeDetails = async () => {
      try {
        // Fetch showtime details including movieId
        const showtimeResponse = await axios.get(`/showtimes/${showtimeId}`);
        const { rows, cols, seats_booked, movieId, price } =
          showtimeResponse.data;
        setSeatingLayout({ rows, cols, seats_booked });
        setTicketPrice(price); // Set ticket price from API response
        // Fetch movie details
        if (movieId) {
          const movieResponse = await axios.get(`/movies/${movieId}`);
          setMovieTitle(movieResponse.data.movieName);
        }
      } catch (error) {
        console.error("Error fetching showtime and movie data:", error);
      }
    };

    fetchShowtimeDetails();
  }, [showtimeId]);

  const handleSeatClick = (seatId) => {
    const updatedSelectedSeats = new Set(selectedSeats);
    if (updatedSelectedSeats.has(seatId)) {
      updatedSelectedSeats.delete(seatId);
    } else {
      updatedSelectedSeats.add(seatId);
    }
    setSelectedSeats(updatedSelectedSeats);
  };

  const renderSeats = () => {
    let seats = [];
    for (let row = 0; row < seatingLayout?.rows; row++) {
      let rowSeats = [];
      for (let col = 0; col < seatingLayout?.cols; col++) {
        const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
        const isBooked = seatingLayout?.seats_booked.includes(seatId);
        const isSelected = selectedSeats.has(seatId);

        rowSeats.push(
          <button
            key={seatId}
            disabled={isBooked}
            className={`seat ${isSelected ? "selected" : ""} ${
              isBooked ? "booked" : ""
            }`}
            onClick={() => handleSeatClick(seatId)}
          >
            {seatId}
          </button>
        );
      }
      seats.push(
        <div key={`row-${row}`} className="seat-row">
          {rowSeats}
        </div>
      );
    }
    return seats;
  };

  const renderSelectedSeatsSummary = () => {
    const selectedSeatsArray = Array.from(selectedSeats);
    const totalCost = selectedSeatsArray.length * ticketPrice;

    return (
      <div className="selected-seats-summary">
        <p>Selected Seats: {selectedSeatsArray.join(", ")}</p>
        <p>Total Seats: {selectedSeatsArray.length}</p>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
      </div>
    );
  };

  if (!seatingLayout) {
    return <div>Loading seating chart...</div>;
  }

  return (
    <>
      <Header />
      <div className="seating-chart-container">
        <h1>{movieTitle}</h1>
        <div className="seating-chart">{renderSeats()}</div>
        {renderSelectedSeatsSummary()}
      </div>
    </>
  );
};

export default SeatingChart;
