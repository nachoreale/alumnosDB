const alumnoModel = require('../models/alumnoModel');

//Autenticacion
exports.auth = async (req, res) => {
    const { legajo, nombre, apellido, anio } = req.body;

    const alumno = await alumnoModel.findOne( {legajo} );
    if( !alumno ){
        res.status(401).json({
            msg: 'Alumno invalido'
        })
    }

}


//Creo el controlador del usuario
exports.crear = async( req, res ) => {
    try {
        const { legajo, nombre, apellido, anio } = req.body
        
        if( !legajo || !nombre || !apellido || !anio ){
            res.status(400).json({
                msg: 'Faltan campos'
            })
        }

        const alumnoNew = new alumnoModel( {
            legajo: legajo,
            nombre: nombre,
            apellido: apellido,
            anio: anio
        } );
        await alumnoNew.save();

        res.status(201).json( { 
            msg: 'Alumno Guardado', 
            id: alumnoNew._id
        } );


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor'})
    }
}

//Actualizar usuario
exports.actualizar = async (req, res) => {
    try {
        const id = req.params.alumnoId;
        const { nombre, apellido, anio } = req.body;

        const myAlumno = await alumnoModel.findById(id);


        if (!myAlumno) {
            return res.status(404).json({ msg: 'Alumno no encontrado' });
        }

        if (nombre) {
            myAlumno.nombre = nombre;
        }
        
        if (apellido) {
            myAlumno.apellido = apellido;
        }

        if (anio) {
            myAlumno.anio = anio;
        }

        await myAlumno.save();

        res.status(200).json({ 
            msg: 'Alumno Actualizado', 
            id: myAlumno._id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

// Eliminar usuario
exports.eliminar = async (req, res) => {
    try {
        const id = req.params.alumnoId;

        const deletedAlumno = await alumnoModel.findByIdAndRemove(id);

        if (!deletedAlumno) {
            return res.status(404).json({ msg: 'Alumno no encontrado' });
        }

        res.status(200).json({ 
            msg: 'Alumno Eliminado', 
            id: deletedAlumno._id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}
