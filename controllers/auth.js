const { response, request } = require( 'express' );
const bcryptjs = require('bcryptjs');


const { generarJWT } = require('../helpers/generarJWT.JS');
const { googleVerify } = require('../helpers/google-verify');
const { User } = require('../models');

const login = async ( req=request, res= response) =>{

    const { email , password } = req.body;
    try {
        // Verificar si el correo existe
        const user = await User.findOne( {email} )

        if(  !user ){
            return   res.status(400).json({
                        msg:'Usuario / Password incorrectos - correo',
                        correo
                    })  
        }

        // Si el usuario esta Activo
        if(  !user.status ){
            return   res.status(400).json({
                success: false,
                msg:'Email / Password incorrectos'
                })
        }

        //Verificar la contraseña

        const validPassword = bcryptjs.compareSync( password, user.password )
        if( !validPassword ){
            return   res.status(400).json({
                success: false,
                msg:'Email / Password incorrectos 2'
            })
        }


        // // Generar el JWT
        const token = await generarJWT( user.id );

        return res.json({
            success: true,
            msg:'Login',
            token,
            user
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el Admi'
        })
    }
}

const googleSignin = async ( req = request , res= response )=>{


    const { id_token } = req.body;

    try {

        const  {correo, nombre,img} = await googleVerify( id_token );

        // Generar la referencia para saber si ya existe en la base de datos
        let usuario = await Usuario.findOne( { correo } );
        if( !usuario ){
            // Tengo que crearlo

            const data = {
                nombre,
                correo,
                password: ":p",
                img,
                google:true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // si el usuario en DB
        if( !usuario.estado ){
            return res.status(401).json({
                msg: "Hbale con el administrador, usuario bloqueado"
            });
        }
        let a = usuario.id;
        //Generar el JWT
        const token = await generarJWT( usuario.uid );

        return res.json({
            msg : 'Todo ok! , miau',
            id_token,
            // googleUser,
            token,
            usuario,
            a
        })
    } catch (error) {

        console.log(error);

        return res.status(400).json({

            msg : 'Token de Google no es valido',
            id_token
        });
    }
}

const RenovarJWT = async (req = request , res= response )=>{

    const usuario = req.usuario;

    try {

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            token,
            usuario
            
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el Admi'
        })
    }
}

module.exports = {
      login,
      googleSignin,
      RenovarJWT
}