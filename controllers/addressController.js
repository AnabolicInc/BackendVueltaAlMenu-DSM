const { response, request } = require("express");
const User = require("../models/user");
const Address = require("../models/address");

const createAddress = async (req = request, res = response) => {
    try {
        const { user_id } = req.params;
        const { address, neighborhood, latitude, longitude } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User not exist, ID: ${user_id}`
            });
        }

        const findAddress = await Address.findOne({ where: { latitude: latitude, longitude: longitude } });
        if (findAddress) {
            return res.status(400).json({
                success: false,
                message: `Address already exist, name: ${address}, neighborhood: ${neighborhood}`
            });
        }

        const newAddress = await Address.create({ address, neighborhood, latitude, longitude, user_id });
        res.status(201).json({
            success: true,
            data: newAddress,
            message: 'Address created'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

const listAddresses = async (req = request, res = response) => {
    try {
        const { user_id } = req.params;

        const addresses = await Address.findAll({
            where: { user_id: user_id},
        });

        res.status(200).json({
            success: true,
            data: addresses
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

module.exports = {
    createAddress,
    listAddresses
}