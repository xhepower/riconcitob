const boom = require('@hapi/boom');
//const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class ClientService {
	constructor() {}

	async create(data) {
		//const hash = await bcrypt.hash(data.password, 10);
		const newClient = await models.Client.create(data);

		return newClient;
	}

	async find() {
		const clients = await models.Client.findAll();
		//delete rta.data.password;
		// clients.forEach((client) => {
		// 	delete client.dataValues.password;
		// });
		return clients;
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
