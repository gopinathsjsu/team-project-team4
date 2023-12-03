import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MovieListings from './components/MovieListings';
import Showtimes from './components/Showtimes';
import About from './components/About';
import Contact from './components/Contact';
import MovieDetail from './components/MovieDetail';
import SeatingChart from './components/SeatingChart';
import AddTheatre from './components/AddTheatre';
import AddScreen from './components/AddScreen';
import AddShowtime from './components/AddShowtime';
import AddMovie from './components/AddMovie';
import TheatreLocations from './components/TheatreLocations';
import UpdateTheatre from './components/UpdateTheatre';
import Screens from './components/Screens';
import UpdateScreen from './components/UpdateScreen';
import Analytics from './components/Analytics'
import UpdateShowtime from './components/UpdateShowtime';
import Profile from './components/profile';
import TheatreShowings from './components/TheatreShowings';
import MembershipOptions from './components/MembershipOptions';
import SeatingChart from './components/SeatingChart';
import Payment from './components/Payment';
import PaymentOverview from './components/PaymentOverview';
import UpdateMovie from './components/UpdateMovie';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='*' element={<Layout><Home/></Layout>}/>
        <Route path='/dashboard' element={<Layout><Dashboard/></Layout>}/>
        <Route path='/login' element={<Layout><Login/></Layout>}/>
        <Route path='/signup' element={<Layout><SignUp/></Layout>}/>
        <Route path='/theatrelocations' element={<Layout><TheatreLocations/></Layout>}/>
        <Route path='/movielistings' element={<Layout><MovieListings/></Layout>}/>
        <Route path='/showtimes' element={<Layout><Showtimes/></Layout>}/>
        <Route path='/about' element={<Layout><About/></Layout>}/>
        <Route path='/contactus' element={<Layout><Contact/></Layout>}/>
        <Route path='/seating/:showtimeId' element={<Layout><SeatingChart/></Layout>}/>
        <Route path='/movie/:movieId' element={<Layout><MovieDetail/></Layout>}/>
        <Route path='/theatrelocations/:theatreId' element={<Layout><TheatreShowings/></Layout>}/>
        <Route path="/update-movie/:id" element={<Layout><UpdateMovie /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path='/memberships' element={<Layout><MembershipOptions/></Layout>}/>
        <Route path="/payment" element={<Layout><Payment /></Layout>} />
        <Route path='/payment-overview' element={<Layout><PaymentOverview/></Layout>}/>
        <Route path="/update-screen/:id" element={<Layout><UpdateScreen /></Layout>} />
        <Route path="/update-showtime/:id" element={<Layout><UpdateShowtime /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path='/addtheatre' element={<Layout><AddTheatre/></Layout>} />
        <Route path='/addscreen' element={<Layout><AddScreen/></Layout>} />
        <Route path='/addshowtime' element={<Layout><AddShowtime/></Layout>} />
        <Route path='/addmovie' element={<Layout><AddMovie/></Layout>} />
        <Route path="/update-theatre/:id" element={<Layout><UpdateTheatre /></Layout>} />
        <Route path="/screens/:id" element={<Layout><Screens /></Layout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
