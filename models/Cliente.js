// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA
const clientSchema = mongoose.Schema(
	{
		telefono: {
			type: String
		},
		nombre: {
			type: String
		}
	},
	{
		timestamps: true, 
	}
)

// 3. MODELO
const Cliente = mongoose.model('Cliente', clientSchema)

// 4. EXPORTACIÓN
module.exports = Cliente
