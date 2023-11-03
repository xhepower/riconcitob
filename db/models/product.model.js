const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';
const CATEGORY_TABLE = 'products';
const ProductSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	idCategory: {
		allowNull: true,
		type: Sequelize.DataTypes.INTEGER,
		references: {
			model: CATEGORY_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
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
	price: {
		allowNull: false,
		type: DataTypes.DECIMAL,
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
};

class Product extends Model {
	static associate(models) {
		this.hasMany(models.DetailProduct, {
			foreignKey: 'productId',
		});
		this.belongsTo(models.Category, { foreignKey: 'idCategory' });
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: PRODUCT_TABLE,
			modelName: 'Product',
			timestamps: false,
		};
	}
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
