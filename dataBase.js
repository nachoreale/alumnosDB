const mongoose = require('mongoose');

// Conexion con la base de datos
mongoose.connect( 'mongodb://localhost:27017/alumnos' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection;