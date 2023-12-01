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
import UpdateMovie from './components/UpdateMovie';
import Profile from './components/profile';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='*' element={<Layout><Home /></Layout>} />
        <Route path='/dashboard' element={<Layout><Dashboard /></Layout>} />
        <Route path='/login' element={<Layout><Login /></Layout>} />
        <Route path='/signup' element={<Layout><SignUp /></Layout>} />
        <Route path='/movielistings' element={<Layout><MovieListings /></Layout>} />
        <Route path='/showtimes' element={<Layout><Showtimes /></Layout>} />
        <Route path='/booktickets' element={<Layout><BookTickets /></Layout>} />
        <Route path='/about' element={<Layout><About /></Layout>} />
        <Route path='/contactus' element={<Layout><Contact /></Layout>} />
        <Route path='/seating' element={<Layout><Seating /></Layout>} />
        <Route path='/movie/:movieId' element={<Layout><MovieDetail /></Layout>} />
        <Route path="/update-movie/:id" element={<Layout><UpdateMovie /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
