import React from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MovieListings from './components/MovieListings';
import BookTickets from './components/BookTickets';
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

function App() {
  return (
      <Routes>
        <Route path='*' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/theatrelocations' element={ <TheatreLocations/>}/>
        <Route path='/movielistings' element={<MovieListings/>}/>
        <Route path='/showtimes' element={<Showtimes/>}/>
        <Route path='/booktickets' element={<BookTickets/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<Contact/>}/>
        <Route path="/seating-chart/:showtimeId" element={<SeatingChart/>} />
        <Route path='/movie/:movieId' element={<MovieDetail/>}/>
        <Route path='/addtheatre' element={<AddTheatre/>} />
        <Route path='/addscreen' element={<AddScreen/>} />
        <Route path='/addshowtime' element={<AddShowtime/>} />
        <Route path='/addmovie' element={<AddMovie/>} />
        <Route path="/update-theatre/:id" element={<UpdateTheatre />} />
        <Route path="/screens/:id" element={<Screens />} />
        <Route path="/update-screen/:id" element={<UpdateScreen />} />
        <Route path="/update-showtime/:id" element={<UpdateShowtime />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    
  );
}

export default App;
