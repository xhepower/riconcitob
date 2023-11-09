const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
class DetailOrderService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newDetailOrder = await models.DetailOrder.create(data);

		return newDetailOrder;
	}

	async find(query) {
		const options = {
			order: [['id', 'DESC']],
			where: {},
			include: [
				{
					model: models.Order,
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
		const users = await models.DetailOrder.findAll(options);
		//delete rta.data.password;
		users.forEach((user) => {
			delete user.dataValues.password;
		});
		return users;
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
