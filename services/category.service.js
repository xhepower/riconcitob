const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class CategoryService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newCategory = await models.Category.create(data);

		return newCategory;
	}

	async find() {
		const categories = await models.Category.findAll({
			include: [{ model: models.Product, include: models.DetailProduct }],
		});
		//delete rta.data.password;
		// categories.forEach((category) => {
		// 	delete category.dataValues.password;
		// });
		return categories;
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
