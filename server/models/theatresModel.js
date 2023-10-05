const mongoose = require('mongoose');

const theatresSchema = new mongoose.Schema(
    {
        theatre_id : {
            type : Number,
            required : true
        },

        theatreName : {
            type : String,
            required : true
        },

        city : {
            type : String,
            required : true
        },

        screensid : {
            type : Array,
            required : true
        }
    }
)

const Theatres = mongoose.model("theatres", theatresSchema);

module.exports = Theatres;