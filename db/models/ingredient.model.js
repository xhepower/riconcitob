const { Model, Sequelize } = require('sequelize');

const INGREDIENT_TABLE = 'ingredients';

const IngredientSchema = {
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
	unitId: {
		allowNull: true,
		type: Sequelize.DataTypes.INTEGER,
	},
	price: {
		allowNull: false,
		type: Sequelize.DataTypes.DECIMAL,
	},
	stock: {
		allowNull: false,
		type: Sequelize.DataTypes.DECIMAL,
	},
	minimum: {
		allowNull: false,
		type: Sequelize.DataTypes.DECIMAL,
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
};

class Ingredient extends Model {
	static associate(models) {
		this.hasMany(models.DetailProduct, {
			foreignKey: 'ingredientId',
		});
		//this.belongsTo(models.Category, { foreignKey: 'idCategory' });
		// this.hasMany(models.Cliente, {
		//   as: 'clientes',
		//   foreignKey: 'idRuta',
		// });
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: INGREDIENT_TABLE,
			modelName: 'Ingredient',
			timestamps: false,
		};
	}
}

module.exports = { INGREDIENT_TABLE, IngredientSchema, Ingredient };
