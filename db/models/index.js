const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Client, ClientSchema } = require('./client.model');
const { Ingredient, IngredientSchema } = require('./ingredient.model');
const { Category, CategorySchema } = require('./category.model');
const { Unit, UnitSchema } = require('./unit.model');
const { Order, OrderSchema } = require('./order.model');
const { DetailProduct, DetailProductSchema } = require('./detailProduct.model');
const { DetailOrder, DetailOrderSchema } = require('./detailOrder.model');
function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Client.init(ClientSchema, Client.config(sequelize));
	Unit.init(UnitSchema, Unit.config(sequelize));
	Ingredient.init(IngredientSchema, Ingredient.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
	Product.init(ProductSchema, Product.config(sequelize));
	Order.init(OrderSchema, Order.config(sequelize));
	DetailProduct.init(DetailProductSchema, DetailProduct.config(sequelize));
	DetailOrder.init(DetailOrderSchema, DetailOrder.config(sequelize));

	Category.associate(sequelize.models);
	Product.associate(sequelize.models);
	Unit.associate(sequelize.models);
	Ingredient.associate(sequelize.models);
}

module.exports = setupModels;
