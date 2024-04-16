const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const Role = require('../models/role');

const register = async (req = request, res = response) => {

    try {

        const { name, lastName, email, password, phone } = req.body;

        // Get to client role
        const role = await Role.findOne({ name: 'CLIENTE' });

        //create base user data
        const userData = {
            name,
            lastName,
            email,
            password,
            phone,
            role_id: role.id
        }

        console.log(userData);
        
        const user = new User(userData);
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();


        res.status(200).json({
            sucess: true,
            data: user,
            msg: 'User created successfully'
        });

        
    } catch (error) {

        res.status(500).json({
            sucess: false,
            msg: 'SERVER ERROR'
        });
        
    }
}


module.exports = {
    register
}