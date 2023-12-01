//import { Link } from "react-router-dom";

export default function Membership_Options() {
  return (
    <>
      <div className="hero">
        <h1><b>Become a member!</b></h1>
      </div>
      <div className="regular-membership-tile">
        <b>Regular membership - <i>FREE</i></b>

        <ul>
          <h2>View your current tickets</h2>
          <h2>Collect reward points and redeem for movie tickets</h2>
          <h2>View your movie watch history</h2>
          <h2>Book up to 8 seats for you and your friends</h2>
          <h2>Cancel your tickets before showtime for a full refund</h2>
        </ul>
      </div>

      <div className="premium-membership-tile">
        <b>Premium membership - <i>$15/year</i></b>

        <ul>
          <h2>All the perks of regular membership</h2>
          <h2><i>PLUS</i> online service fee waived for any booking!</h2>
        </ul>
      </div>
    </>
  );
}
