const express = require('express');
const dataBase = require('./dataBase');
const alumnoModel = require('./models/alumnoModel')
const alumnoController = require('./controllers/alumnoController');


const app = express();
const port = 2023;

app.use( express.json() );

dataBase.on('error', () => {
    console.error('Error de conexion con MongoDB')
})

dataBase.once( 'open', () => {
    console.log('Conexion con MongoDB exitosa')
})

//Rutas
app.get('/', (req, res) => {
    res.send(`<h1>Listado de Alumnos</h1>
    <a href="/alumnos">ir a todos los alumnos</a>`);

})
app.get('/alumnos', async (req, res) => {
    try {
        const alumnos = await alumnoModel.find({}, 'legajo nombre apellido');

        res.send(`
            <h1>Listado de Alumnos</h1>
            <ul>
                ${alumnos.map(alumno => `
                    <li>
                        ${alumno.nombre} ${alumno.apellido} -
                        <a href="/alumnos/${alumno.legajo}">Ver detalles</a>
                    </li>
                `).join('')}
            </ul>
        `);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

app.get('/alumnos/:legajo', async (req, res) => {
    try {
        const legajo = req.params.legajo;

        const alumno = await alumnoModel.findOne({ legajo });

        if (!alumno) {
            return res.status(404).json({ msg: 'Alumno no encontrado' });
        }

        res.send(`
            <h1>Detalles del Alumno</h1>
            <p>Nombre: ${alumno.nombre}</p>
            <p>Apellido: ${alumno.apellido}</p>
            <p>Legajo: ${alumno.legajo}</p>
            <p>Año: ${alumno.anio}</p>

        `);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

app.post('/api/auth', alumnoController.auth);

app.post('/api/alumno', alumnoController.crear);

app.put('/api/alumno/:alumnoId', alumnoController.actualizar);


app.delete('/api/alumno/:alumnoId', alumnoController.eliminar);




app.listen( port, () => {
    console.log('Servidor escuchando en el puerto', port);
})

