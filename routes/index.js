const express = require('express');

const usersRouter = require('./users.router');
const productsRouter = require('./products.router');
const clientsRouter = require('./clients.router');
const unitsRouter = require('./units.router');
const ingredientsRouter = require('./ingredients.router');
const categoriesRouter = require('./categories.router');
const authRouter = require('./auth.router');
const ordersRouter = require('./orders.router');
const detailProductsRouter = require('./detailProducts.router');
const detailOrdersRouter = require('./detailOrders.router');
function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/auth', authRouter);
	router.use('/users', usersRouter);
	router.use('/products', productsRouter);
	router.use('/clients', clientsRouter);
	router.use('/units', unitsRouter);
	router.use('/ingredients', ingredientsRouter);
	router.use('/categories', categoriesRouter);
	router.use('/orders', ordersRouter);
	router.use('/detailproducts', detailProductsRouter);
	router.use('/detailorders', detailOrdersRouter);
}

module.exports = routerApi;
