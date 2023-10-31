const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema(
    {
        member_id : {
            type : Number,
            required : true
        },

        firstName : {
            type : String,
            required : true
        },

        lastName : {
            type : String,
            required : true
        },

        email : {
            type : String,
            required : true
        },

        phone : {
            type : String,
            required : true
        },
        
        username : {
            type : String,
            required : true
        },
        
        password : {
            type : String,
            required : true
        },

        role : {
            type : String,
            required : true
        }
    }
)

const Members = mongoose.model("members", membersSchema);

module.exports = Members;