const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
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
	description: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
};

class Category extends Model {
	static associate(models) {
		this.hasMany(models.Product, {
			foreignKey: 'idCategory',
		});
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: CATEGORY_TABLE,
			modelName: 'Category',
			timestamps: false,
		};
	}
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
