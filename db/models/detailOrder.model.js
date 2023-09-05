const { Model, Sequelize } = require('sequelize');

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
	},
	productId: {
		allowNull: false,
		type: Sequelize.DataTypes.INTEGER,
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
