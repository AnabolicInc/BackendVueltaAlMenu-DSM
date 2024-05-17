const { request, response } = require("express")

const User = require("../models/user")

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

    user.verification_code = verificationCode;
    await user.save();

    await emailHelper.sendEmail(
        user.email,
        `Código de verificación por correo electrónico: ${verificationCode}`,
        `Estimad@ ${user.name} ${user.lastName} para modificar su contraseña debe ingresar el siguiente código de verificación`,
        `<b>${verificationCode}</b>`
    );

    res.status(200).json({
        success: true,
        message: 'Email sent'
    });

}
//verify code
const verifyCode = async (req = request, res = response) => {
    const { email, code } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User is not valid'
        })
    }

    if (user.verification_code !== code) {
        return res.status(400).json({
            success: false,
            message: 'Code is not valid'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Code is valid'
    });

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



module.exports = {
    getUsers,
    changePassword,
    putUser,
    verifyCode
}