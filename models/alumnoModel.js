const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const alumnoSchema = new Schema ({
    legajo: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    anio:{
        type: Number,
        required: true
    },
    
})

const Alumno = mongoose.model( 'Alumno', alumnoSchema);

module.exports = Alumno;