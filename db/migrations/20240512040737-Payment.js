'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Payments', {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			holder_name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			card_number: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			expiration_date: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			cvc: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
			},
			session_token: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			cuotes: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
			},
			type: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			order_id: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Orders',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
		});

	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	}
};
