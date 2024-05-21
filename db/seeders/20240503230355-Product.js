'use strict';

const { quantity } = require('../../models/product');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Hamburguesa de pollo',
        price: 10000,
        description: 'Hamburguesa de pollo con lechuga, tomate y queso',
        quantity: 10,
        category_id: 1,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
