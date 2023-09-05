const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class DetailOrderService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newDetailOrder = await models.DetailOrder.create(data);

		return newDetailOrder;
	}

	async find() {
		const detailorders = await models.DetailOrder.findAll();
		//delete rta.data.password;
		// detailorders.forEach((detailorder) => {
		// 	delete detailorder.dataValues.password;
		// });
		return detailorders;
	}

	async findOne(id) {
		const detailorder = await models.DetailOrder.findByPk(id);
		if (!detailorder) {
			throw boom.notFound('detailorder not found');
		}
		delete detailorder.dataValues.password;
		return detailorder;
	}
	async findByEmail(email) {
		const detailorder = await models.DetailOrder.findOne({
			where: { email },
		});
		if (!detailorder) {
			throw boom.notFound('detailorder not found');
		}
		//delete detailorder.dataValues.password;
		return detailorder;
	}

	async update(id, changes) {
		const detailorder = await this.findOne(id);
		const rta = await detailorder.update(changes);
		//delete rta.dataValues.password;
		return rta;
	}

	async delete(id) {
		const detailorder = await this.findOne(id);
		await detailorder.destroy();
		return { id };
	}
}

module.exports = DetailOrderService;
