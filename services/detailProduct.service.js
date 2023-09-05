const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class DetailProductService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newDetailProduct = await models.DetailProduct.create(data);

		return newDetailProduct;
	}

	async find() {
		const detailproducts = await models.DetailProduct.findAll();
		//delete rta.data.password;
		// detailproducts.forEach((detailproduct) => {
		// 	delete detailproduct.dataValues.password;
		// });
		return detailproducts;
	}

	async findOne(id) {
		const detailproduct = await models.DetailProduct.findByPk(id);
		if (!detailproduct) {
			throw boom.notFound('detailproduct not found');
		}
		delete detailproduct.dataValues.password;
		return detailproduct;
	}
	async findByEmail(email) {
		const detailproduct = await models.DetailProduct.findOne({
			where: { email },
		});
		if (!detailproduct) {
			throw boom.notFound('detailproduct not found');
		}
		//delete detailproduct.dataValues.password;
		return detailproduct;
	}

	async update(id, changes) {
		const detailproduct = await this.findOne(id);
		const rta = await detailproduct.update(changes);
		//delete rta.dataValues.password;
		return rta;
	}

	async delete(id) {
		const detailproduct = await this.findOne(id);
		await detailproduct.destroy();
		return { id };
	}
}

module.exports = DetailProductService;
