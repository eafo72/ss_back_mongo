/* Importing the express module and creating an instance of it. */
const express = require('express')
const app = express.Router()
const Usuario = require('../models/Usuario') // NUESTRO MODELO PARA PERMITIR GENERAR O MODIFICAR USUARIOS CON LA BASE DE DATOS
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/authorization')
const mailer = require('../controller/mailController')

//app.get('/obtener', auth, async (req, res) => {
app.get('/obtener', async (req, res) => {
	try {
		const usuarios = await Usuario.find({})
        res.json({usuarios})

	} catch (error) {
		res.status(500).json({ msg: 'Hubo un error obteniendo los datos' })
	}
})

// SINGLE
app.get('/single/:id', async (req, res) => {
			
	try {
		const single = await Usuario.findById(req.params.id) 
		res.json({single})
		

	} catch (error) {
		res.status(500).json({ msg: 'Hubo un error obteniendo los datos del id '+req.params.id+' error: '+error })
	}

})

// CREAR UN USUARIO JWT
app.post('/crear', async (req, res) => {
	const { nombre, tipo, correo, password, direccion, telefono, cumpleanios } = req.body 
	
	try {

		const ifExist = await Usuario.find( { correo: correo } )

		if(ifExist.length > 0){

			res.status(500).json({
				msg: 'El correo '+correo+' ya existe',
			})	

		}else{

			const salt = await bcryptjs.genSalt(10);
			const hashedPassword = await bcryptjs.hash(password, salt);
			
			const respuestaDB = await Usuario.create({
				nombre,
				tipo,
				correo,
				password: hashedPassword,
				direccion,
				telefono,
				cumpleanios
			})
			const payload = {user:{id:respuestaDB._id}}
			
			jwt.sign(payload,process.env.SECRET,{expiresIn:36000},(error,token)=>{
				if(error)throw error
				res.json({token})
				//res.json(respuestaDB)
			})
			
		}
		
	} catch (error) {
		return res.status(400).json({
			msg: error,
		})
	}
})



// INICIAR SESIÓN
app.post('/login', async (req, res) => {
	const { email, password } = req.body

	try {
		let foundUser = await Usuario.findOne({ correo:email})
        if(!foundUser){
            return res.status(500).json({msg:'El usuario no existe'}) 
        }

        const passCorrecto = await bcryptjs.compare(password,foundUser.password)

        if(!passCorrecto){
            return await res.status(500).json({msg: 'Password incorrecto'})
        }

        const payload = {
            user:{
                id: foundUser.id,
            },
        }

        //firma del jwt
        if(email && passCorrecto){
            jwt.sign(payload, process.env.SECRET, {expiresIn:3600000}, (error,token)=>{
                if(error) throw error

                res.status(200).json({token})
            })
        }else{
            res.status(500).json({msg:'Hubo un error', error})
        }
	} catch (error) {
		res.status(500).json({ msg: 'Hubo un error', error })
	}
})

// VERIFICAR
app.get('/verificar', auth, async (req, res) => {
	try {
        //CONFIRMAMOS QUE EL USUARIO EXISTA EN LA BD Y RETORNAMOS SUS DATOS EXCLUYENDO EL PASSW
        const usuario = await Usuario.findById(req.user.id).select('-password') //el req.user.id lo obtiene del token NO lo recibe de la url
        res.json({usuario})

		
	} catch (error) {
		// EN CASO DE ERROR DEVOLVEMOS UN MENSAJE CON EL ERROR
		res.status(500).json({
			msg: 'Hubo un error',
			error,
		})
	}
})

// ACTUALIZAR
//app.put('/actualizar', auth, async (req, res) => {
app.put('/actualizar', async (req, res) => {
	const { id, nombre, tipo, correo, direccion, telefono, cumpleanios } = req.body
	try {

		const ifExist = await Usuario.find( { correo: correo, _id: { $ne: id } } )

		if(ifExist.length > 0){

			res.status(500).json({
				msg: 'El correo '+correo+' ya existe',
			})	

		}else{

			const updateUsuario = await Usuario.findByIdAndUpdate(id,{nombre, tipo, correo, direccion, telefono, cumpleanios},{new:true})
        	res.json({updateUsuario})
		
		}

	} catch (error) {
		res.status(500).json({
			msg: 'Hubo un error actualizando la Usuario',
		})
	}
})

// BORRAR
app.post('/borrar', async (req, res) => {
	const { id } = req.body
	
	try {
		const deleteUsuario = await Usuario.findByIdAndRemove({ _id: id })
		res.json(deleteUsuario)
	} catch (error) {
		res.status(500).json({
			msg: 'Hubo un error borrando el Usuario '+id,
		})
	}
})





module.exports = app
