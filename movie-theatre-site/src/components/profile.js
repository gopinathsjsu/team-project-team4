import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const Profile = () => {
  const [memberData, setMemberData] = useState(null);
  const [movieHistory, setMovieHistory] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [expandedTicket, setExpandedTicket] = useState(null);
  const { auth } = useAuth();

  //console.log("In Profile");
  //console.log(auth);
  const id = auth.id; // Adjust according to your auth object structure

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // Fetch member details
        const response = await fetch(`/member/${id}/profile`);
        const memberData = await response.json();
        setMemberData(memberData);

        // Fetch movie history
        const historyResponse = await fetch(`/member/${id}/movie-history`);
        const historyData = await historyResponse.json();
        setMovieHistory(historyData);

        // Fetch tickets purchased
        const ticketsResponse = await fetch(`/tickets`);
        const ticketsData = await ticketsResponse.json();
        setMyTickets(ticketsData.filter((ticket) => ticket.memberid === id));

        let ticketData = {};
        for (let i = 0; i < myTickets.length; i++) {
          console.log(myTickets[i]);
          const showtimeResponse = await fetch(
            `/showtimes/${myTickets[i].showid}`
          );
          const showtime = await showtimeResponse.json();

          const movieResponse = await fetch(`/movies/${showtime.movieid}`);
          const movieData = await movieResponse.json();

          ticketData[myTickets[i]._id] = {
            ticket: myTickets[i],
            show: showtime,
            movie: movieData,
          };
        }
        setTicketDetails(ticketData);
        console.log(ticketDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMemberData();
  }, [id]);

  const toggleTickets = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const handleCancel = async (ticketId) => {
    if (window.confirm("Are you sure you want cancel your tickets for this movie?")) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/tickets/${ticketId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          const updatedTicketsResponse = await fetch(`/tickets`);
          const updatedTicketsData = await updatedTicketsResponse.json();
          setMyTickets(updatedTicketsData.filter((ticket) => ticket.memberid === id));

          const updatedTicketDetails = { ...ticketDetails };
          delete updatedTicketDetails[ticketId];
          setTicketDetails(updatedTicketDetails);

          alert("Your tickets were cancelled successfully. Payment was refunded to the original method.");
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error("There was an error cancelling your tickets:", error);
        alert("There was an error cancelling your tickets.");
      }
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {memberData ? (
        <>
          <ul className="profile-details">
            <li>
              <strong>First Name:</strong> {memberData.firstName}
            </li>
            <li>
              <strong>Last Name:</strong> {memberData.lastName}
            </li>
            <li>
              <strong>Email:</strong> {memberData.email}
            </li>
            <li>
              <strong>Phone:</strong> {memberData.phone}
            </li>
            <li>
              <strong>Username:</strong> {memberData.username}
            </li>
            <li>
              <strong>Role:</strong> {memberData.role}
            </li>
            <li>
              <strong>Rewards:</strong> {memberData.rewards}
            </li>
          </ul>

          <h2>Past 30 Days Movie History</h2>
          <ul className="movie-history-list">
            {movieHistory.length > 0 ? (
              movieHistory.map((movie, index) => <li key={index}>{movie}</li>)
            ) : (
              <li>No recent movie history available.</li>
            )}
          </ul>

          <h2>My Tickets</h2>
          <ul className="purchased-tickets-list">
            {Object.keys(ticketDetails).length ? (
              Object.entries(ticketDetails).map(([ticketId, ticketData]) => (
                <li key={ticketId}>
                  <button onClick={() => toggleTickets(ticketId)}>
                    {ticketData.movie.movieName} -{" "}
                    <i>
                      {ticketData.show.showDate.split("-")[1]}/
                      {ticketData.show.showDate.split("-")[2].substring(0, 2)}/
                      {ticketData.show.showDate.split("-")[0]}
                    </i>
                    <span className="arrow">
                      {expandedTicket === ticketId ? "▲" : "▼"}
                    </span>
                  </button>
                  {expandedTicket === ticketId && (
                    <div className="ticket-expanded-tile">
                      <img
                        src={ticketData.movie.img}
                        alt={ticketData.movie.title}
                        className="movie-image"
                      />
                      <div>
                        <p>{ticketData.movie.description}</p>
                        <p>
                          <strong>Time: </strong>
                          {ticketData.show.showStartTime}
                        </p>
                        <p>
                          <strong>Seats: </strong>
                          {ticketData.ticket.seatsBooked.join(",")}
                        </p>
                        <i>{ticketData.ticket.isPaymentViaRewards === true || ticketData.ticket.paymentMethod === "rewards" ?
                        "Purchased with rewards points." : ""}</i>
                      </div>
                    </div>
                  )}
                  {expandedTicket === ticketId && (
                    <div className="cancel-ticket">
                      <button onClick={() => handleCancel(ticketId)}>
                        Cancel Tickets
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li>You have no current movie tickets.</li>
            )}
          </ul>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
