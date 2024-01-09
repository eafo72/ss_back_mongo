// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA
const usertypeSchema = mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [true,'El nombre es obligatorio']
		},
		
	},
	{
		timestamps: true, 
	}
)

// 3. MODELO
const TiposUsuario = mongoose.model('TiposUsuario', usertypeSchema)

// 4. EXPORTACIÓN
module.exports = TiposUsuario

