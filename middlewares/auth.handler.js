const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
	const apiKey = req.headers['api'];
	if (apiKey === config.apiKey) {
		next();
	} else {
		next(boom.unauthorized('Problemas con el api key'));
	}
}

function checkAdminRole(req, res, next) {
	const user = req.user;
	if (user.role === 'admin' || user.role === 'GOD') {
		next();
	} else {
		next(boom.unauthorized('problemas con el role'));
	}
}

function checkRoles(...roles) {
	roles.push('admin');
	return (req, res, next) => {
		const user = req.user;
		if (roles.includes(user.role)) {
			next();
		} else {
			next(boom.unauthorized('checkroles'));
		}
	};
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
