'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('../lib/db');

module.exports = function setupMetricModel(config) {
	const sequelize = setupDatabase(config);

	return sequelize.define('metric', {
		type: {
			type: sequelize.STRING,
			allowNull: false
		},
		value: {
			type: Sequelize.TEXT,
			allowNull: false
		}
	});
};
