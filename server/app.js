const express = require('express');
const path = require('path');
const Movies = require('./models/moviesModel');
const Theatres = require('./models/theatresModel');
const Users = require('./models/usersModel');
const Members = require('./models/membersModel');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

Movies.find().then(movies => {console.log(movies);})
Theatres.find().then(theatres => {console.log(theatres);})
Users.find().then(users => {console.log(users);})
Members.find().then(members => {console.log(members);})

module.exports = app;
