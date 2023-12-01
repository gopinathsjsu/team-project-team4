import React from 'react';
import { useAuth } from './AuthContext'; // Import useAuth
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieTitle, movieImage, selectedSeats, totalCost, showtimeId } = location.state || {};
  const { auth } = useAuth(); // Use the hook to access auth state
  // Function to handle payment submission
  const handlePaymentSubmission = async (paymentMethod) => {
    try {
      // Assuming that the API call is only required for 'money' payment method
      /*if (paymentMethod === 'money') {
        const ticketData = {
          seatsBooked: selectedSeats,
          showid: showtimeId, // Replace with actual show ID
          memberid: auth' // Replace with actual member ID
        };

        await axios.post('/tickets', ticketData);
      }*/

      // Navigate to Payment page with all necessary details
      navigate('/payment', {
        state: {
          movieTitle,
          selectedSeats,
          totalCost,
          paymentMethod
        }
      });
    } catch (error) {
      console.error('Error during payment submission:', error);
      // Handle error appropriately
    }
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
      </div>
    </div>
  );
};

export default PaymentOverview;
