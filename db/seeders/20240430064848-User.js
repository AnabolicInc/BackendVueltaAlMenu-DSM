'use strict';

const bcryptjs = require('bcryptjs');
const { Role } = require('../../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        const salt = bcryptjs.genSaltSync();
        return queryInterface.bulkInsert('Users', [
            {
                name: "Diego",
                lastName: "Aguilera",
                email: "diego.aguilera@ce.ucn.cl",
                phone: "986448520",
                image: "",
                password: bcryptjs.hashSync("diegoCE2024", salt),
                role_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Pepe",
                lastName: "Lopez",
                email: "delivery365Platos@gmail.com",	
                phone: "989758520",
                image: "https://res-console.cloudinary.com/dgck9g94o/media_explorer_thumbnails/49ca9e180207e495fc9f0aae8cd0d460/detailed",
                password: bcryptjs.hashSync("pepe123", salt),
                role_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};