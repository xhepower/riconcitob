const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
class ClientService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newClient = await models.Client.create(data);

		return newClient;
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
		const users = await models.Client.findAll(options);
		//delete rta.data.password;
		users.forEach((user) => {
			delete user.dataValues.password;
		});
		return users;
	}

	async findOne(id) {
		const client = await models.Client.findByPk(id);
		if (!client) {
			throw boom.notFound('client not found');
		}
		delete client.dataValues.password;
		return client;
	}
	async findByEmail(email) {
		const client = await models.Client.findOne({
			where: { email },
		});
		if (!client) {
			throw boom.notFound('client not found');
		}
		//delete client.dataValues.password;
		return client;
	}

	async update(id, changes) {
		const client = await this.findOne(id);
		const rta = await client.update(changes);
		//delete rta.dataValues.password;
		return rta;
	}

	async delete(id) {
		const client = await this.findOne(id);
		await client.destroy();
		return { id };
	}
}

module.exports = ClientService;
