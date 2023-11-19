import React, { useState     } from 'react';
import Header from "./Header";
// Define a Seat component

const Seat = ({ row, number, price, onToggle, isSelected }) => (
  <button
    className={`seat ${isSelected ? 'selected' : ''}`}
    onClick={() => onToggle(row, number)}
  >
    {number}
  </button>
);

// Define the SeatingChart component
const Seating = () => {
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  // Function to toggle seat selection
  const toggleSeatSelection = (row, number) => {
    const seatId = `${row}${number}`;
    if (selectedSeats.has(seatId)) {
      selectedSeats.delete(seatId);
    } else {
      selectedSeats.add(seatId);
    }
    setSelectedSeats(new Set([...selectedSeats]));
  };

  // Function to generate seats
  const generateSeats = (row, count, price) => {
    const seats = [];
    for (let i = 1; i <= count; i++) {
      seats.push(
        <Seat
          key={`${row}-${i}`}
          row={row}
          number={i}
          price={price}
          isSelected={selectedSeats.has(`${row}${i}`)}
          onToggle={toggleSeatSelection}
        />
      );
    }
    return seats;
  };
  return (
    <><Header /><div className="seating-chart">
      <div className="row vip">
        <div className="label">VIP - Rs. 350.00</div>
        {generateSeats('O', 14, 350)}
      </div>
      <div className="row normal">
        <div className="label">NORMAL - Rs. 250.00</div>
        {generateSeats('M', 20, 250)}
        {/* Repeat for other rows */}
      </div>
      {/* ... */}
    </div></>
  );
};

export default Seating;
