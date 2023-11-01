const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Movies = require('./models/moviesModel');
const Theatres = require('./models/theatresModel');
const Users = require('./models/usersModel');
const Members = require('./models/membersModel');
const registrationRoutes = require('./endpointRoutes/registrationEndpoint');
const regularMembersRoutes = require('./endpointRoutes/regularMembersEndpoint');
const premiumMembersRoutes = require('./endpointRoutes/premiumMembersEndpoint');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
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

app.get('/movies/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const movie = await Movies.findById(id);
        return response.status(200).json(movie);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

app.post('/movies', async (request, response) => {
    try {
        console.log(request.body);
        if (
            !request.body.movieName || !request.body.status || !request.body.description || !request.body.language || !request.body.length
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const newMovie = {
            movie_id : request.body.movie_id,
            movieName : request.body.movieName,
            status : request.body.status,
            description : request.body.description,
            language : request.body.language,
            length : request.body.length,
            date : request.body.date,
            img : request.body.img,
            rating : request.body.rating
        }

        const movie = await Movies.create(newMovie);
        return response.status(200).json(movie);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

app.use(registrationRoutes);
app.use(regularMembersRoutes);
app.use(premiumMembersRoutes);

Movies.find().then(movies => {console.log(movies);})
Theatres.find().then(theatres => {console.log(theatres);})
Users.find().then(users => {console.log(users);})
Members.find().then(members => {console.log(members);})

module.exports = app;
