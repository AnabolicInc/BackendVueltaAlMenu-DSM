const { request, response } = require("express")

const User = require("../models/user")
const bcrypt = require("bcryptjs");

const emailHelper = require('../helpers/send-email');




const getUsers = async (req = request, res = response) => {
    try {
        console.log(req.user);
        
        const users = await User.findAll();
        const data = "data";
        res.status(200).json({
            data: users,
        })
    } catch (error) {
        res.status(500).json({
            message: 'false'
        })
    }
}


const changePassword = async (req = request, res = response) => {
    
    const { email } = req.body;
    console.log('email', email);
    

    console.log(email);
    const user = await User.findOne({ where: { email } });
    
    

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User is not valid'
        })
    }

    console.log(user);
    // make verification code
    const verificationCode = 123489;

    await emailHelper.sendEmail(
        user.email,
        `Código de verificación por correo electrónico: ${verificationCode}`,
        `Estimad@ ${user.name} ${user.lastName} para modificar su contraseña debe ingresar el siguiente código de verificación`,
        `<b>${verificationCode}</b>`
    );

    res.status(200).send('Email Send');

}

const putUser = async (req = request, res = response) => {

    const {id} = req.params;

    const {name , lastName, phone} = req.body;

    const responseUpdate =  await User.update({name, lastName, phone}, {where: {id}}); // update user

    const updatedUser = await User.findByPk(id); // get user updated

    console.log(responseUpdate);
    
    if (responseUpdate[0] === 0) {
        return res.status(400).json({
            success: false,
            message: 'User not found'
        })
    }

    res.status(201).json({
        success: true,
        data: updatedUser,
        message: 'User updated',
        
    });
};


const newPassword = async (req = request, res = response) => {
    const { email, newPassword } = req.body;

    try {
        console.log("Actualmente en UserController.try")

        // Encuentra al usuario por correo electrónico
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Verifica si la nueva contraseña es la misma que la actual
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña nueva debe ser distinta a la actual'
            });
        }

        // Hashea la nueva contraseña
        console.log("Se realizará el hash")
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("Hash realizado")

        // Actualiza la contraseña del usuario
        await User.update({ password: hashedPassword }, { where: { email } });

        res.status(200).json({
            success: true,
            message: 'Contraseña cambiada correctamente'
        });
    } catch (error) {
        console.log("ERROR ENCONTRADO")

        res.status(500).json({
            success: false,
            message: 'Ocurrió un error durante el cambio de contraseña, intente nuevamente',
            error: error.message
        });
    }
};




module.exports = {
    getUsers,
    changePassword,
    putUser,
    newPassword
}