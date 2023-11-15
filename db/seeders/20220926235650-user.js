'use strict';
const bcrypt = require('bcrypt');
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
		await queryInterface.bulkInsert(
			USER_TABLE,
			[
				{
					email: 'hbuezoss@gmail.com',
					password: await bcrypt.hash('elguapo69', 10),
					role: 'admin',
					created_at: new Date(),
				},
				{
					email: 'xhepo@hotmail.es',
					password: await bcrypt.hash('elguapo69', 10),
					role: 'editor',
					created_at: new Date(),
				},
				{
					email: 'xhepoldc@gmail.com',
					password: await bcrypt.hash('elguapo69', 10),
					role: 'user',
					created_at: new Date(),
				},
			],
			{}
		);
		await queryInterface.bulkInsert(
			UNIT_TABLE,
			[
				{
					name: 'unidad',
					created_at: new Date(),
				},
				{
					name: 'libra',
					created_at: new Date(),
				},
				{
					name: 'onza',
					created_at: new Date(),
				},
				{
					name: 'docena',
					created_at: new Date(),
				},
			],
			{}
		);
		await queryInterface.bulkInsert(
			CATEGORY_TABLE,
			[
				{
					name: 'Bebidas',
					description: 'Bebidas sabrosas',
					created_at: new Date(),
				},
				{
					name: 'Comidas',
					description: 'Comidas solidas sabrosas',
					created_at: new Date(),
				},
			],
			{}
		);
		await queryInterface.bulkInsert(CLIENT_TABLE, [
			{
				name: 'Heber Buezo',
				phone: '99493367',
				created_at: new Date(),
			},
			{
				name: 'Jessi Gomez',
				phone: '98746366',
				created_at: new Date(),
			},
			{
				name: 'GENERICO',
				phone: 'no tiene',
				created_at: new Date(),
			},
		]);
		await queryInterface.bulkInsert(INGREDIENT_TABLE, [
			{
				name: 'Huevo',
				unitId: 1,
				cost: 4,
				price: 7,
				stock: 30,
				minimum: 10,
				created_at: new Date(),
			},
		]);
		await queryInterface.bulkInsert(
			PRODUCT_TABLE,
			[
				{
					name: 'Desayuno con mortadela',
					description: 'Desayuno con mortadela, huevito, frijoples y platano',
					idCategory: 2,
					price: 50,
					created_at: new Date(),
				},
				{
					name: 'Media porcion tajadas',
					description: 'Media porcion de pollo acompañado con tajadas',
					idCategory: 2,
					price: 90,
					created_at: new Date(),
				},
				{
					name: 'Coca cola 300 ml',
					description: 'coca cola portatil pequeña 300 ml',
					idCategory: 1,
					price: 22,
					created_at: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});
		await queryInterface.bulkDelete('units', null, {});
		await queryInterface.bulkDelete('clients', null, {});
		await queryInterface.bulkDelete('detailproducts', null, {});
		await queryInterface.bulkDelete('products', null, {});
		await queryInterface.bulkDelete('detailingredients', null, {});
		await queryInterface.bulkDelete('ingredients', null, {});
	},
};
