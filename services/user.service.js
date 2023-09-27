const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
class UserService {
	constructor() {}

	async create(data) {
		const hash = await bcrypt.hash(data.password, 10);
		const newUser = await models.User.create({
			...data,
			password: hash,
		});
		delete newUser.dataValues.password;

		return newUser;
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
		const users = await models.User.findAll(options);
		//delete rta.data.password;
		users.forEach((user) => {
			delete user.dataValues.password;
		});
		return users;
	}

	async findOne(id) {
		const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound('user not found');
		}
		delete user.dataValues.password;
		return user;
	}
	async findByEmail(email) {
		const user = await models.User.findOne({
			where: { email },
		});
		if (!user) {
			throw boom.notFound('user not found');
		}
		//delete user.dataValues.password;
		return user;
	}

	async update(id, changes) {
		const user = await this.findOne(id);
		const rta = await user.update(changes);
		delete rta.dataValues.password;
		return rta;
	}

	async delete(id) {
		const user = await this.findOne(id);
		await user.destroy();
		return { id };
	}
}

module.exports = UserService;
