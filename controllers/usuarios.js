const { response, request } = require('express');

const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT.JS');


const { User } = require('../models');


const usuariosPost = async (req, res = response) => {

    const { name, password, email, img, status } = req.body;
    
    const user = new User({ name, password, email, img, status })
    // Emcriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    //Guardar en BD
    const newUser = await user.save();

    // Generar el JWT
    const token = await generarJWT(newUser.id);

    res.status(200).json({
        success: true,
        token,
        user: newUser
    });
}

const usuariosGet = async (req = request, res = response) => {


    const { limit = 5, desde = 0 } = req.query;

    const users = await User.findAll({
        limit: parseInt(limit),
        offset: parseInt(desde),
    });

    res.json({
        success: true,
        users
    }

    );
};

const usuariosPut = async (req = request, res = response) => {

    const id = req.params.id;
    const { password,...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.update({ ...rest }, {
        where: {
          id
        }
      });

    res.json({
        success: true,
        user: rest
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    const usuario = await User.destroy({
        where: {
          id
        }
      });

    res.json({
        success: true,
        msg: 'Se elimino Correctamente',
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}
