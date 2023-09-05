const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class ProductService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newProduct = await models.Product.create(data);

		return newProduct;
	}

	async find() {
		const products = await models.Product.findAll({
			include: models.DetailProduct,
		});
		//delete rta.data.password;
		// products.forEach((product) => {
		// 	delete product.dataValues.password;
		// });
		return products;
	}

	async findOne(id) {
		const product = await models.Product.findByPk(id);
		if (!product) {
			throw boom.notFound('product not found');
		}
		delete product.dataValues.password;
		return product;
	}
	async findByEmail(email) {
		const product = await models.Product.findOne({
			where: { email },
		});
		if (!product) {
			throw boom.notFound('product not found');
		}
		//delete product.dataValues.password;
		return product;
	}

	async update(id, changes) {
		const product = await this.findOne(id);
		const rta = await product.update(changes);
		//delete rta.dataValues.password;
		return rta;
	}

	async delete(id) {
		const product = await this.findOne(id);
		await product.destroy();
		return { id };
	}
}

module.exports = ProductService;
