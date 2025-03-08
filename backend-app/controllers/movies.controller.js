const Movie = require('../models/movies.model');

//Función para recuperar la colección de ventas
const getMovies = async (req, res) => {
    try {
        const Movies = await Movie.find({});
        res.status(200).json(Movies);
    } catch (error) {
        res.status(500).json({
            status: "error " + error.message
        });
    }
}

// Función para recuperar un elmento con base en el id
const getMovieById = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        //const movie = await Movie.findById(); // Buscar la venta por ID
        const movie = await Movie.findOne({ 'show_id': id }); // Buscar la venta por ID

        if (!movie) {
            return res.status(404).json({ message: "Película no encontrada" });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

//Función que agrega un elemento
const setMovie = async (req, res) => {
    try {
        // Verificar si req.body está vacío o si los campos clave están ausentes
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "El cuerpo de la solicitud no puede estar vacío" });
        }

        // Validar que los campos necesarios estén presentes
        const { show_id, title, type } = req.body; // Ejemplo de campos clave
        if (!show_id || !title || !type) {
            return res.status(400).json({ message: "Faltan campos requeridos (show_id, title, type)" });
        }

        const movieVerificar = await Movie.findOne({ 'show_id': req.body.show_id }); // Buscar la venta por ID
        if (movieVerificar) {
            return res.status(400).json({
                message: "Ya una película con ese id"
            });
        }

        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
}

//Función para actualizar un elemento de la collección
const updateMovies = async (req, res) => {
    try {
        const { id } = req.params;

        // Intentar actualizar directamente
        const updatedMovie = await Movie.findOneAndUpdate(
            { 'show_id': id },        // Buscar por `show_id`
            req.body,                 // Los datos nuevos a actualizar
            { new: true }             // Devuelve el documento actualizado
        );

        // Si no se encuentra el documento, retornar error
        if (!updatedMovie) {
            return res.status(404).json({
                status: "error",
                message: "No se encontró una película con ese id"
            });
        }

        // Si la película se actualizó, devolver el resultado
        res.status(200).json(updatedMovie);

    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
}

// Función para eliminar una venta por ID
/* const deleteMovieById = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        const movieEliminada = await Movie.findByIdAndDelete(id); // Buscar y eliminar la venta por ID

        if (!movieEliminada) {
            return res.status(404).json({ message: "Película no encontrada" });
        }

        res.status(200).json({ message: "Película eliminada correctamente", movieEliminada });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
}; */

// Función para eliminar una venta por ID
const deleteMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const Movies = Movie.find({ 'show_id': id });
        if (!Movies) {
            res.status(400).json({
                message: "Documento no encontrado"
            });
        }
        const deleteById = await Movie.deleteOne({ 'show_id': id });
        res.status(200).json({
            message: "Documento eliminado"
        })
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
}

/*const deleteMovieById2 = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si la venta existe
        const movie = await Venta.findOne({ 'show_id': id });
        if (!movie) {
            return res.status(404).json({ message: "Error: Película no encontrada" });
        }
        // Si existe, eliminar la venta
        await Venta.deleteOne({ 'show_id': id });

        res.status(200).json({ message: "Documento eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};  */

module.exports = {
    getMovies,
    getMovieById,
    setMovie,
    updateMovies,
    deleteMovieById
}