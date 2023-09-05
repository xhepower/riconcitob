const { Model, DataTypes, Sequelize } = require('sequelize');

const UNIT_TABLE = 'units';

const UnitSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: true,
	},

	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
};

class Unit extends Model {
	static config(sequelize) {
		return {
			sequelize,
			tableName: UNIT_TABLE,
			modelName: 'Unit',
			timestamps: false,
		};
	}
}

module.exports = { UNIT_TABLE, UnitSchema, Unit };
