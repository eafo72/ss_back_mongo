// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA
const messageSchema = mongoose.Schema(
	{
		telefono: {
			type: String
		},
		emisor: {
			type: String
		},
		mensaje: {
			type: String,
		}
	},
	{
		timestamps: true, 
	}
)

// 3. MODELO
const Mensaje = mongoose.model('Mensaje', messageSchema)

// 4. EXPORTACIÓN
module.exports = Mensaje
