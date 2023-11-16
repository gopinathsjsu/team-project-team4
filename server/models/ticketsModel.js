const mongoose = require('mongoose');
const Users = require('./usersModel');
const Showtimes = require('./showtimesModel');

const { Schema } = mongoose;

const ticketsSchema = new mongoose.Schema(
    {
        userid : {
            type : Schema.Types.ObjectId,
            ref : Users,
            required : true
        },

        showid : {
            type : Schema.Types.ObjectId,
            ref : Showtimes,
            required : true
        },

        seatsBooked : {
            type : Array,
            required : true
        }
    }
)

const Tickets = mongoose.model("tickets", ticketsSchema);

module.exports = Tickets;