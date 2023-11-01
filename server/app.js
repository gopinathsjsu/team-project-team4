const express = require('express');
const path = require('path');
const Movies = require('./models/moviesModel');
const Theatres = require('./models/theatresModel');
const Users = require('./models/usersModel');
const Members = require('./models/membersModel');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.get('/movies', async (request, response) => {
    try {
        const movies = await Movies.find({});
        return response.status(200).json(movies);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

Movies.find().then(movies => {console.log(movies);})
Theatres.find().then(theatres => {console.log(theatres);})
Users.find().then(users => {console.log(users);})
Members.find().then(members => {console.log(members);})

module.exports = app;
