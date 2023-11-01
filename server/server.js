const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registrationRoutes = require('./endpointRoutes/registrationEndpoint');
const regularMembersRoutes = require('./endpointRoutes/regularMembersEndpoint');
const premiumMembersRoutes = require('./endpointRoutes/premiumMembersEndpoint');

const app = express();

const dburl = 'mongodb+srv://Mahee:Mahee123@cluster0.bndg37a.mongodb.net/movieDB?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    } catch (error) {
        console.error(error);
    }
}

app.use(express.json()); // Using the built-in JSON parser from Express
app.use(registrationRoutes);

app.use(regularMembersRoutes);
app.use(premiumMembersRoutes);
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

connect();


/*const mongoose = require('mongoose');
//const app = require('./app');
const app = express();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const dburl='mongodb+srv://Mahee:Mahee123@cluster0.bndg37a.mongodb.net/movieDB?retryWrites=true&w=majority'

async function connect(){
    try {
        await mongoose.connect(dburl);
        console.log("Connected to MongoDB");
    } catch(error){
        console.error(error);
    }
}

connect();

app.listen(3000, () =>{
    console.log("Server started on port 3000");
});

app.use(bodyParser.json());*/
