import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/Signup';
import MovieListings from './components/MovieListings';
import Showtimes from './components/Showtimes';
import About from './components/About';
import Contact from './components/Contact';
import MovieDetail from './components/MovieDetail';
import TheatreLocations from './components/TheatreLocations';
import TheatreShowings from './components/TheatreShowings';
import UpdateMovie from './components/UpdateMovie';
import Profile from './components/profile';
import MembershipOptions from './components/MembershipOptions';
import SeatingChart from './components/SeatingChart';
import Payment from './components/Payment';
import PaymentOverview from './components/PaymentOverview';
import Profile from './components/profile';

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
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
