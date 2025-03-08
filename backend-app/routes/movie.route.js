const express = require('express');
const router = express.Router();

const {
    getMovies,
    getMovieById,
    setMovie,
    updateMovies,
    deleteMovieById
} = require('../controllers/movies.controller'); 
const e = require('express');

// Endpoint para recuperar toda la collecion Ventas
router.get('/all', getMovies);
// Endpoint para recuperar un documento de la collecion Ventas
router.get('/ById/:id', getMovieById);
// Endpoint para agrega un documento de la collecion Ventas
router.post('/add', setMovie);
// Endpoint para actualizar un documento de la collecion Ventas
router.put('/modify/:id', updateMovies);
// Endpoint para elimnar un documento de la collecion Ventas
router.delete('/less/:id', deleteMovieById);

module.exports = router;