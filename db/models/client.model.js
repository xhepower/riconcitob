const { Model, DataTypes, Sequelize } = require('sequelize');

const CLIENT_TABLE = 'clients';

const ClientSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.DataTypes.INTEGER,
	},
	name: {
		allowNull: false,
		type: Sequelize.DataTypes.STRING,
		unique: true,
	},
	phone: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
};

class Client extends Model {
	static config(sequelize) {
		return {
			sequelize,
			tableName: CLIENT_TABLE,
			modelName: 'Client',
			timestamps: false,
		};
	}
}

module.exports = { CLIENT_TABLE, ClientSchema, Client };
