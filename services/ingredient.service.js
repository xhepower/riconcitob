const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class IngredientService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newIngredient = await models.Ingredient.create(data);

		return newIngredient;
	}

	async find() {
		const ingredients = await models.Ingredient.findAll();
		//delete rta.data.password;
		// ingredients.forEach((ingredient) => {
		// 	delete ingredient.dataValues.password;
		// });
		return ingredients;
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
