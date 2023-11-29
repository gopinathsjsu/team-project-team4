import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieTitle, movieImage, selectedSeats, totalCost } = location.state || {};

  // Function to handle payment submission
  const handlePaymentSubmission = (paymentMethod) => {
    // Navigate to Payment page with all necessary details
    navigate('/payment', {
      state: {
        movieTitle,
        selectedSeats,
        totalCost,
        paymentMethod
      }
    });
  };

  return (
    <div className="payment-overview-container">
      <h1>Payment Overview</h1>
      <img src={movieImage} alt={movieTitle} className="movie-poster" />
      <h2>{movieTitle}</h2>
      <p>Selected Seats: {selectedSeats.join(', ')}</p>
      <p>Total Cost: ${totalCost}</p>
      
      <div className="payment-methods">
        <button onClick={() => handlePaymentSubmission('rewardPoints')}>Pay with Reward Points</button>
        <button onClick={() => handlePaymentSubmission('money')}>Pay with Money</button>
        <button onClick={() => handlePaymentSubmission('both')}>Pay with Both</button>
      </div>
    </div>
  );
};

export default PaymentOverview;
