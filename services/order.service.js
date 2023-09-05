const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class OrderService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newOrder = await models.Order.create(data);

		return newOrder;
	}

	async find() {
		const orders = await models.Order.findAll();
		//delete rta.data.password;
		// orders.forEach((order) => {
		// 	delete order.dataValues.password;
		// });
		return orders;
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
