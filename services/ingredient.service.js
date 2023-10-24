const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
class IngredientService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newIngredient = await models.Ingredient.create(data);

		return newIngredient;
	}

	async find(query) {
		const options = {
			order: [['id', 'DESC']],
			where: {},
			include: models.Unit,
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
		const users = await models.Ingredient.findAll(options);
		//delete rta.data.password;
		users.forEach((user) => {
			delete user.dataValues.password;
		});
		return users;
	}

	async findOne(id) {
		const ingredient = await models.Ingredient.findByPk(id);
		if (!ingredient) {
			throw boom.notFound('ingredient not found');
		}
		delete ingredient.dataValues.password;
		return ingredient;
	}
	async findByEmail(email) {
		const ingredient = await models.Ingredient.findOne({
			where: { email },
		});
		if (!ingredient) {
			throw boom.notFound('ingredient not found');
		}
		//delete ingredient.dataValues.password;
		return ingredient;
	}

	async update(id, changes) {
		const ingredient = await this.findOne(id);
		const rta = await ingredient.update(changes);
		//delete rta.dataValues.password;
		return rta;
	}

	async delete(id) {
		const ingredient = await this.findOne(id);
		await ingredient.destroy();
		return { id };
	}
}

module.exports = IngredientService;
