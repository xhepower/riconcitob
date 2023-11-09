const { Model, Sequelize } = require('sequelize');

const ORDER_TABLE = 'orders';

const OrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.DataTypes.INTEGER,
	},
	clientId: {
		allowNull: true,
		type: Sequelize.DataTypes.INTEGER,
	},
	status: {
		allowNull: true,
		type: Sequelize.DataTypes.STRING,
		defaultValue: 'cocinando',
	},
	total: {
		allowNull: false,
		type: Sequelize.DataTypes.DECIMAL,
		defaultValue: 0,
	},

	createdAt: {
		allowNull: false,
		type: Sequelize.DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
};

class Order extends Model {
	static associate(models) {
		this.hasMany(models.DetailOrder, {
			foreignKey: 'orderId',
		});
		this.belongsTo(models.Client, { foreignKey: 'clientId' });
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: 'Order',
			timestamps: false,
		};
	}
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
