const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Theatres = require('./models/theatresModel');
const Users = require('./models/usersModel');
const Members = require('./models/membersModel');
const registrationRoutes = require('./endpointRoutes/registrationEndpoint');
const regularMembersRoutes = require('./endpointRoutes/regularMembersEndpoint');
const premiumMembersRoutes = require('./endpointRoutes/premiumMembersEndpoint');
const moviesRoutes = require('./endpointRoutes/moviesEndpoint');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.use(moviesRoutes);
app.use(registrationRoutes);
app.use(regularMembersRoutes);
app.use(premiumMembersRoutes);

Theatres.find().then(theatres => {console.log(theatres);})
Users.find().then(users => {console.log(users);})
Members.find().then(members => {console.log(members);})

module.exports = app;
