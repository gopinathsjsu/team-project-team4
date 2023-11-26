import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeatingChart = ({ showtimeId }) => {
  const [seatingLayout, setSeatingLayout] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  useEffect(() => {
    // Replace with your actual API endpoint
    axios.get(`/showtimes/${showtimeId}`)
      .then(response => {
        setSeatingLayout(response.data);
      })
      .catch(error => console.error('Error fetching seating data:', error));
  }, [showtimeId]);

  const handleSeatClick = (seatId) => {
    if (selectedSeats.has(seatId)) {
      selectedSeats.delete(seatId);
    } else {
      selectedSeats.add(seatId);
    }
    setSelectedSeats(new Set([...selectedSeats]));
  };

  if (!seatingLayout) {
    return <div>Loading seating chart...</div>;
  }

  const renderSeats = () => {
    let seats = [];
    for (let row = 0; row < seatingLayout.rows; row++) {
      const rowSeats = [];
      for (let col = 0; col < seatingLayout.columns; col++) {
        const seatId = String.fromCharCode(65 + row) + (col + 1); // E.g., A1, B2
        const isBooked = seatingLayout.bookedSeats.includes(seatId);
        const isSelected = selectedSeats.has(seatId);

        rowSeats.push(
          <button
            key={seatId}
            disabled={isBooked}
            className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
            onClick={() => handleSeatClick(seatId)}
          >
            {seatId}
          </button>
        );
      }
      seats.push(<div key={`row-${row}`} className="seat-row">{rowSeats}</div>);
    }
    return seats;
  };

  return (
    <div className="seating-chart">
      {renderSeats()}
    </div>
  );
};

export default SeatingChart;
