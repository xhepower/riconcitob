const express = require('express');
const passport = require('passport');
const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
	updateOrderSchema,
	createOrderSchema,
	getOrderSchema,
	queryOrderSchema,
} = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();
const { checkRoles } = require('./../middlewares/auth.handler');

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	checkRoles(),
	validatorHandler(queryOrderSchema, 'query'),
	async (req, res, next) => {
		try {
			const users = await service.find(req.query);
			res.json(users);
		} catch (error) {
			next(error);
		}
	}
);
router.get(
	'/totalpages',
	passport.authenticate('jwt', { session: false }),
	checkRoles(),
	validatorHandler(queryOrderSchema, 'query'),
	async (req, res, next) => {
		try {
			const users = await service.find(req.query);
			res.json(users.length);
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	checkRoles(),
	validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const category = await service.findOne(id);
			res.json(category);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	checkRoles(),
	validatorHandler(createOrderSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newCategory = await service.create(body);
			res.status(201).json(newCategory);
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	checkRoles(),
	validatorHandler(getOrderSchema, 'params'),
	validatorHandler(updateOrderSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const category = await service.update(id, body);
			res.json(category);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	checkRoles(),
	validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			await service.delete(id);
			res.status(201).json({ id });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
