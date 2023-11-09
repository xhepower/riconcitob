const { Model, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const DETAIL_ORDER_TABLE = 'detailorders';

const DetailOrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.DataTypes.INTEGER,
	},
	orderId: {
		allowNull: false,
		type: Sequelize.DataTypes.INTEGER,
		references: {
			model: ORDER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	productId: {
		allowNull: false,
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

class DetailOrder extends Model {
	static associate(models) {
		this.belongsTo(models.Product, { foreignKey: 'productId' });
		this.belongsTo(models.Order, { foreignKey: 'orderId' });
		// this.hasMany(models.Cliente, {
		//   as: 'clientes',
		//   foreignKey: 'idRuta',
		// });
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: DETAIL_ORDER_TABLE,
			modelName: 'DetailOrder',
			timestamps: false,
		};
	}
}

module.exports = { DETAIL_ORDER_TABLE, DetailOrderSchema, DetailOrder };
