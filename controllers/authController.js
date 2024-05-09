const { response, request } = require("express");
const User = require("../models/user");
const Role = require("../models/role");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generate-jwt");
const jwt = require("jsonwebtoken");


const login = async (req = request, res = response) => {

    try {

        const { email, password } = req.body;
        

        const user = await User.findOne({ where: { email } });
        
        
        
        //verify password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Credenciales no válidas. Revise sus datos e intente nuevamente.' 
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        const userData = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
            phone: user.phone,
            role_id: user.role_id,
            session_token: token
        }


        res.status(200).json({
            success: true,
            data: userData,
            message: 'Login success'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}


const register = async (req = request, res = response) => {
    try {

        const { name:  nameReq,
            lastName: lastNameReq,
            email: emailReq,
            password: passwordReq,
            phone: phoneReq } = req.body;

        console.log('DATA FROM USER: ', req.body)

        // Obtiene el rol de cliente 
        const role = await Role.findOne({ where: { name: 'CLIENTE' } });


        //Crea un objeto con los datos del usuario
        const userData = {
            name:  nameReq,
            lastName: lastNameReq,
            email: emailReq,
            password: passwordReq,
            phone: phoneReq,
            role_id: role.id,
        }

        console.log(userData);

        const user = new User(userData);
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);
        await user.save();

        const token = await generateJWT(user.id);
        

        const { id, name,lastName,email,role_id } = user;

        const dataUser = { id, name, lastName, email, role_id, session_token: token };

        console.log('DATA USER: ', dataUser);
        res.status(201).json({
            success: true,
            data: dataUser,
            message: 'USER CREATED'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:  'USER NOT CREATED'
        });
    }
}

const validateToken = async (req = request, res = response) => {
    
    const authHeader = req.headers['authorization'];
   
    token = authHeader && authHeader.split(' ')[1];
    
    // Separate the token from the "Bearer" prefix
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not in token'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        const user = await User.findByPk(id);

        const {
            name,
            lastName,
            phone,
            email,
            image,
            role_id
        } = user;

        const dataUser = { id, name, lastName, phone, email, image, role_id, session_token: token };

        if (user) {
            return res.status(200).json({
                success: true,
                message: 'Token is valid',
                data: dataUser
            })
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired',
                expired: true,
                error
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error
        });
    }
}




module.exports = {
    login,
    register,
    validateToken
}