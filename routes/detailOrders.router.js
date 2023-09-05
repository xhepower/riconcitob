const express = require('express');
const passport = require('passport');
const DetailOrderService = require('./../services/detailOrder.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
	updateDetailOrderSchema,
	createDetailOrderSchema,
	getDetailOrderSchema,
} = require('./../schemas/detailOrder.schema');

const router = express.Router();
const service = new DetailOrderService();
const { checkRoles } = require('./../middlewares/auth.handler');

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	checkRoles(),
	async (req, res, next) => {
		try {
			const detailorders = await service.find();
			res.json(detailorders);
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	checkRoles(),
	validatorHandler(getDetailOrderSchema, 'params'),
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
	validatorHandler(createDetailOrderSchema, 'body'),
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
	validatorHandler(getDetailOrderSchema, 'params'),
	validatorHandler(updateDetailOrderSchema, 'body'),
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
	validatorHandler(getDetailOrderSchema, 'params'),
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
