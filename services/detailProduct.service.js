const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
class DetailProductService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newDetailProduct = await models.DetailProduct.create(data);

		return newDetailProduct;
	}

	async find(query) {
		const options = {
			order: [['id', 'DESC']],
			where: {},
			include: [
				{
					model: models.Product,
				},
				{
					model: models.Ingredient,
				},
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
		const users = await models.DetailProduct.findAll(options);
		//delete rta.data.password;
		users.forEach((user) => {
			delete user.dataValues.password;
		});
		return users;
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
