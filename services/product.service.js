const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
class ProductService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newProduct = await models.Product.create(data);

		return newProduct;
	}

	async find(query) {
		const options = {
			order: [['id', 'DESC']],
			where: {},
			include: models.DetailProduct,
		};
		const { limit, offset, date, date_min, date_max, searchText, searchField } =
			query;
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
		const users = await models.Product.findAll(options);
		//delete rta.data.password;
		users.forEach((user) => {
			delete user.dataValues.password;
		});
		return users;
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
