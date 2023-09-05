'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { ORDER_TABLE } = require('./../models/order.model');
const { PRODUCT_TABLE } = require('./../models/product.model');
const { CLIENT_TABLE } = require('./../models/client.model');
const { INGREDIENT_TABLE } = require('./../models/ingredient.model');
const { CATEGORY_TABLE } = require('./../models/category.model');
const { UNIT_TABLE } = require('./../models/unit.model');
const { DETAIL_PRODUCT_TABLE } = require('./../models/detailProduct.model');
const { DETAIL_ORDER_TABLE } = require('./../models/detailOrder.model');
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(USER_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			email: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				unique: true,
			},
			password: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			recoveryToken: {
				allowNull: true,
				type: Sequelize.DataTypes.STRING,
				field: 'recovery_token',
			},
			role: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				defaultValue: 'usuario',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});
		await queryInterface.createTable(CLIENT_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				unique: true,
			},
			phone: {
				allowNull: true,
				type: Sequelize.DataTypes.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});
		await queryInterface.createTable(UNIT_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				unique: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});
		await queryInterface.createTable(INGREDIENT_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				unique: true,
			},
			unitId: {
				allowNull: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			price: {
				allowNull: false,
				type: Sequelize.DataTypes.DECIMAL,
			},
			stock: {
				allowNull: false,
				type: Sequelize.DataTypes.DECIMAL,
			},
			minimum: {
				allowNull: false,
				type: Sequelize.DataTypes.DECIMAL,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});
		await queryInterface.createTable(CATEGORY_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				unique: true,
			},
			description: {
				allowNull: true,
				type: Sequelize.DataTypes.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});
		await queryInterface.createTable(PRODUCT_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			idCategory: {
				allowNull: true,
				type: Sequelize.DataTypes.INTEGER,
				references: {
					model: CATEGORY_TABLE,
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			name: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				unique: true,
			},
			description: {
				allowNull: true,
				type: Sequelize.DataTypes.STRING,
			},
			price: {
				allowNull: false,
				type: Sequelize.DataTypes.DECIMAL,
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});
		await queryInterface.createTable(ORDER_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			clientId: {
				allowNull: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			status: {
				allowNull: true,
				type: Sequelize.DataTypes.STRING,
			},
			total: {
				allowNull: false,
				type: Sequelize.DataTypes.DECIMAL,
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});
		await queryInterface.createTable(DETAIL_PRODUCT_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			ingredientId: {
				allowNull: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			productId: {
				allowNull: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			quantity: {
				allowNull: false,
				type: Sequelize.DataTypes.DECIMAL,
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});
		await queryInterface.createTable(DETAIL_ORDER_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			orderId: {
				allowNull: false,
				type: Sequelize.DataTypes.INTEGER,
			},
			productId: {
				allowNull: false,
				type: Sequelize.DataTypes.INTEGER,
			},

			quantity: {
				allowNull: false,
				type: Sequelize.DataTypes.DECIMAL,
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable(USER_TABLE);
		await queryInterface.dropTable(CLIENT_TABLE);
		await queryInterface.dropTable(PRODUCT_TABLE);
		await queryInterface.dropTable(CATEGORY_TABLE);
		await queryInterface.dropTable(INGREDIENT_TABLE);
		await queryInterface.dropTable(UNIT_TABLE);
		await queryInterface.dropTable(ORDER_TABLE);
		await queryInterface.dropTable(DETAIL_PRODUCT_TABLE);
		await queryInterface.dropTable(DETAIL_ORDER_TABLE);
	},
};
