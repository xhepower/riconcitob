const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
const ProductService = require('./product.service');
const IngredientService = require('./ingredient.service');
class OrderService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const productService = new ProductService();
		const ingredientService = new IngredientService();
		const newOrder = await models.Order.create(data);
		const orderId = newOrder.id;
		data.items.map(async (item) => {
			const { productId, quantity, price } = item;
			await models.DetailOrder.create({
				orderId: orderId,
				productId: productId,
				quantity: quantity,
				price: price,
			});
			console.log('data', productId, quantity, price);
			const ingredients = (await productService.findOne(productId)).dataValues
				.DetailProducts;
			ingredients.map((item) => {
				const ingId = parseFloat(item.dataValues.ingredientId);
				const ingQunatity = parseFloat(item.dataValues.quantity);
				console.log('item', ingId, ingQunatity);
				ingredientService.restarStock(
					ingId,
					parseFloat(quantity) * parseFloat(ingQunatity)
				);
			});
		});
		return newOrder;
	}

	async find(query) {
		const options = {
			order: [['id', 'DESC']],
			where: {},
			include: [
				{
					model: models.Client,
				},
				{ model: models.DetailOrder },
			],
		};
		const {
			limit,
			offset,
			date,
			date_min,
			date_max,
			searchText,
			searchField,
			fk,
			fkIndex,
		} = query;
		if (limit && offset) {
			options.limit = limit;
			options.offset = offset;
		}
		if (searchText && searchField) {
			options.where[searchField] = {
				[Op.iLike]: `%${searchText}%`,
				// [Op.like]: ´%${searchText }%´,
			};
		}
		if (date) {
			const fecha = new Date(date);
			const fechaArriba = new Date(fecha);
			fechaArriba.setDate(fecha.getDate() + 1);
			options.where.createdAt = {
				[Op.gte]: fecha,
				[Op.lt]: fechaArriba,
			};
		}
		if (fk) {
			options.where[fk] = {
				[Op.eq]: fkIndex,
				// [Op.like]: ´%${searchText }%´,
			};
		}
		const users = await models.Order.findAll(options);
		//delete rta.data.password;
		users.forEach((user) => {
			delete user.dataValues.password;
		});
		return users;
	}

	async findOne(id) {
		const order = await models.Order.findByPk(id);
		if (!order) {
			throw boom.notFound('order not found');
		}
		delete order.dataValues.password;
		return order;
	}
	async findByEmail(email) {
		const order = await models.Order.findOne({
			where: { email },
		});
		if (!order) {
			throw boom.notFound('order not found');
		}
		//delete order.dataValues.password;
		return order;
	}

	async update(id, changes) {
		const order = await this.findOne(id);
		const rta = await order.update(changes);
		//delete rta.dataValues.password;
		return rta;
	}

	async delete(id) {
		const order = await this.findOne(id);
		await order.destroy();
		return { id };
	}
}

module.exports = OrderService;
