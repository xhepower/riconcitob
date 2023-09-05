const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class UnitService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newUnit = await models.Unit.create(data);

		return newUnit;
	}

	async find() {
		const units = await models.Unit.findAll();
		//delete rta.data.password;
		// units.forEach((unit) => {
		// 	delete unit.dataValues.password;
		// });
		return units;
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
