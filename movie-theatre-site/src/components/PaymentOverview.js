import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieTitle, movieImage, selectedSeats, totalCost, showtimeId } = location.state || {};
  const { auth } = useAuth();

  // State to store theater details
  const [theaterDetails, setTheaterDetails] = useState({});

  // Fetch theater details
  useEffect(() => {
    const fetchTheaterDetails = async () => {
      try {
        const showtimeResponse = await axios.get(`/showtimes/${showtimeId}`);
        const { screen_id } = showtimeResponse.data;
        const screenResponse = await axios.get(`/screens/${screen_id}`);
        const { theatre_id } = screenResponse.data;

        const theaterResponse = await axios.get(`/theatres/${theatre_id}`);
        setTheaterDetails({
          theaterName: theaterResponse.data.theatreName,
          screenNumber: screenResponse.data.screen_no,
        });
      } catch (error) {
        console.error('Error fetching theater details:', error);
      }
    };

    fetchTheaterDetails();
  },[showtimeId]);

  // Function to handle payment submission
  const handlePaymentSubmission = async (paymentMethod) => {
    try {
      console.log("****In payment****");
      console.log(auth.id);
      // Assuming that the API call is only required for 'money' payment method
      if (paymentMethod === 'money') {
        if(auth.id)
        {
          const ticketData = {
            seatsBooked: selectedSeats,
            showid: showtimeId,
            memberid: auth.id,
          };
  
          await axios.post('/tickets', ticketData);
        }
        else{
          const ticketData = {
            seatsBooked: selectedSeats,
            showid: showtimeId
          };
  
          await axios.post('/tickets', ticketData);
        }
        
      }

      // Navigate to Payment page with all necessary details
      navigate('/payment', {
        state: {
          movieTitle,
          selectedSeats,
          totalCost,
          paymentMethod,
          ...theaterDetails, // Include theater details in the state
        },
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
      <p>Theater: {theaterDetails.theaterName}</p>
      <p>Screen Number: {theaterDetails.screenNumber}</p>

      <div className="payment-methods">
        <button onClick={() => handlePaymentSubmission('rewardPoints')}>Pay with Reward Points</button>
        <button onClick={() => handlePaymentSubmission('money')}>Pay with Money</button>
      </div>
    </div>
  );
};

export default PaymentOverview;
