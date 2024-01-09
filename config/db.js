// IMPORTACIÓN DE LA LIBRERÍA DE MONGOOSE
const mongoose = require('mongoose')
require('dotenv').config()

// FUNCIÓN PARA REALIZAR UNA CONEXIÓN CON BASE DE DATOS
const connectDB = async () => {
	try {
		// CONEXIÓN A BASE DE DATOS
		// IMPORTANTE UTILIZAR NUESTRA VARIABLE DE ENTORNO CON PROCESS.ENV
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		// EXPRESAR EN TERMINAL QUE NUESTRA BASE DE DATOS FUE CONECTADA CORRECTAMENTE
		console.log('Base de datos conectada')
	} catch (error) {
		console.log(error)
		process.exit(1) // DETIENE LA APP POR COMPLETO
	}
}

// EXPORTACIÓN DE LA FUNCIÓN PARA ACCESO
module.exports = connectDB
