import React from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
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
import { TheatreLocations } from './components/TheatreLocations';
function App() {
  return (
      <Routes>
        <Route path='*' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/movielistings' element={<MovieListings/>}/>
        <Route path='/theatrelocations' element={<TheatreLocations/>}/>
        <Route path='/showtimes' element={<Showtimes/>}/>
        <Route path='/booktickets' element={<BookTickets/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<Contact/>}/>
        <Route path='/seating' element={<Seating/>}/>
        <Route path='/moviedetails' element={<MovieDetail/>}/>
      </Routes>
    
  );
}

export default App;
