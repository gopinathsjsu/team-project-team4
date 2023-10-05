const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
    {
        movie_id : {
            type : Number,
            required : true
        },

        movieName : {
            type : String,
            required : true
        },

        status : {
            type : String,
            required : true
        },

        description : {
            type : String,
            required : true
        },

        language : {
            type : String,
            required : true
        }
    }
)

const Movies = mongoose.model("movies", moviesSchema);

module.exports = Movies;