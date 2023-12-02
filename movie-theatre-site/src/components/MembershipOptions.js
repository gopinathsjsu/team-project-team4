import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';

export default function Membership_Options() {
  const { auth, setAuth } = useAuth();

  return (
    <>
      <div className="hero">
        <h1>Membership</h1>
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

      <button className="membership-button">
      {!auth.isAuthenticated || (auth.isAuthenticated && auth.role === 'guest') ?
        (<Link to="/signup">Become a member</Link>) :
        (<p>Do nothing</p>)}
          {/*(<Link to="/profile">Update your membership</Link>)}*/} {/* Why does isAuth reset? */}  
      </button>
    </>
  );
}
