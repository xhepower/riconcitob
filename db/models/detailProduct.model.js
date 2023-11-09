const { Model, Sequelize } = require('sequelize');

const DETAIL_PRODUCT_TABLE = 'detailproducts';
const INGREDIENT_TABLE = 'ingredients';
const PRODUCT_TABLE = 'products';
const DetailProductSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.DataTypes.INTEGER,
	},
	ingredientId: {
		allowNull: true,
		type: Sequelize.DataTypes.INTEGER,
		references: {
			model: INGREDIENT_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	productId: {
		allowNull: true,
		type: Sequelize.DataTypes.INTEGER,
		references: {
			model: PRODUCT_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	quantity: {
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

class DetailProduct extends Model {
	static associate(models) {
		this.belongsTo(models.Product, { foreignKey: 'productId' });
		this.belongsTo(models.Ingredient, { foreignKey: 'ingredientId' });
		// this.hasMany(models.Cliente, {
		//   as: 'clientes',
		//   foreignKey: 'idRuta',
		// });
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: DETAIL_PRODUCT_TABLE,
			modelName: 'DetailProduct',
			timestamps: false,
		};
	}
}

module.exports = { DETAIL_PRODUCT_TABLE, DetailProductSchema, DetailProduct };
