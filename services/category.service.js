const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
class CategoryService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newCategory = await models.Category.create(data);

		return newCategory;
	}

	async find(query) {
		const options = { order: [['id', 'DESC']], where: {} };
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
		const users = await models.Category.findAll(options);
		//delete rta.data.password;
		users.forEach((user) => {
			delete user.dataValues.password;
		});
		return users;
	}

	async findOne(id) {
		const category = await models.Category.findByPk(id);
		if (!category) {
			throw boom.notFound('category not found');
		}
		delete category.dataValues.password;
		return category;
	}
	async findByEmail(email) {
		const category = await models.Category.findOne({
			where: { email },
		});
		if (!category) {
			throw boom.notFound('category not found');
		}
		//delete category.dataValues.password;
		return category;
	}

	async update(id, changes) {
		const category = await this.findOne(id);
		const rta = await category.update(changes);
		//delete rta.dataValues.password;
		return rta;
	}

	async delete(id) {
		const category = await this.findOne(id);
		await category.destroy();
		return { id };
	}
}

module.exports = CategoryService;
