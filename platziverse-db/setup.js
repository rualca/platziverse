'use strict';

const debug = require('debug')('platziverse:db:setup');
const db = require('./');

async function setup() {
	const config = {
		database: process.env.DB_NAME || 'platziverse',
		usernmae: process.env.DB_USER || 'platzi',
		password: process.env.DB_PASS || 'platzi',
		host: process.env.DBHOST || 'localhost',
		dialect: 'postgres',
		logging: s => debug(s),
		setup: true
	};

	await db(config).catch(handlerFatalError);

	console.log('Success!');
	process.exit(0);
}

function handlerFatalError(error) {
	console.error(error.message);
	console.error(error.stack);
	process.exit(1);
}

setup();
