const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
class UnitService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newUnit = await models.Unit.create(data);

		return newUnit;
	}

	async find(query) {
		const options = {
			order: [['id', 'DESC']],
			where: {},
			include: models.Ingredient,
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
		const users = await models.Unit.findAll(options);
		//delete rta.data.password;
		users.forEach((user) => {
			delete user.dataValues.password;
		});
		return users;
	}

	async findOne(id) {
		const unit = await models.Unit.findByPk(id);
		if (!unit) {
			throw boom.notFound('unit not found');
		}
		delete unit.dataValues.password;
		return unit;
	}
	async findByEmail(email) {
		const unit = await models.Unit.findOne({
			where: { email },
		});
		if (!unit) {
			throw boom.notFound('unit not found');
		}
		//delete unit.dataValues.password;
		return unit;
	}

	async update(id, changes) {
		const unit = await this.findOne(id);
		const rta = await unit.update(changes);
		//delete rta.dataValues.password;
		return rta;
	}

	async delete(id) {
		const unit = await this.findOne(id);
		await unit.destroy();
		return { id };
	}
}

module.exports = UnitService;
