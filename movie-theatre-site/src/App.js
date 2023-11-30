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
import BookTickets from './components/BookTickets';
import Showtimes from './components/Showtimes';
import About from './components/About';
import Contact from './components/Contact';
import Seating from './components/Seating';
import MovieDetail from './components/MovieDetail';
import TheatreLocations from './components/TheatreLocations';
import TheatreShowings from './components/TheatreShowings';
import UpdateMovie from './components/UpdateMovie';
import MembershipOptions from './components/MembershipOptions';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='*' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/theatrelocations' element={<TheatreLocations/>}/>
        <Route path='/movielistings' element={<MovieListings/>}/>
        <Route path='/showtimes' element={<Showtimes/>}/>
        <Route path='/booktickets' element={<BookTickets/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<Contact/>}/>
        <Route path='/seating' element={<Seating/>}/>
        <Route path='/movie/:movieId' element={<MovieDetail/>}/>
        <Route path='/theatrelocations/:theatreId' element={<TheatreShowings/>}/>
        <Route path="/update-movie/:id" element={<Layout><UpdateMovie /></Layout>} />
        <Route path='/memberships' element={<MembershipOptions/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
