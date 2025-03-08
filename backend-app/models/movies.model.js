//Definiendo un objeto de tipo mongoose
const mongoose = require('mongoose');

//Definiendo la estructura 
const MoviesSchema = mongoose.Schema(
    {
        show_id: {
            type: String,
            require: true
        },

        type: {
            type: String,
            require: true
        },

        title: {
            type: String,
            require: true
        },

        director: {
            type: String
        },

        cast: {
            type: String
        },

        country: {
            type: String
        },

        date_added: {
            type: Date,
            require: true
        },

        release_year: {
            type: Number,
            require: true
        },

        rating: {
            type: String,
            require: true
        },

        duration: {
            type: String,
            require: true
        },

        listed_in: {
            type: String,
            require: true
        },

        description: {
            type: String,
            require: true
        }
    }
)

//const Movies = mongoose.model('Movies', MoviesSchema,"Movies");
const Movies = mongoose.model('Movies', MoviesSchema);
module.exports = Movies;