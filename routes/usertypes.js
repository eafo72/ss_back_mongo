/* Importing the express module and creating an instance of it. */
const express = require('express')
const app = express.Router()
const TiposUsuario = require('../models/TiposUsuario') // NUESTRO MODELO PARA PERMITIR GENERAR O MODIFICAR USUARIOS CON LA BASE DE DATOS
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/authorization')

//app.get('/obtener', auth, async (req, res) => {
app.get('/obtener', async (req, res) => {
	try {
		const tipos_usuario = await TiposUsuario.find({})
        res.json({tipos_usuario})

	} catch (error) {
		res.status(500).json({ msg: 'Hubo un error obteniendo los datos' })
	}
})


module.exports = app
