'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const debug = require('debug')('platziverse:db:setup');
const db = require('./');

const prompt = inquirer.createPromptModule();

async function setup() {
	const answer = await prompt({
		type: 'confirm',
		name: 'setup',
		message: 'This will destroy your database, are you sure?'
	});

	if (!answer.setup) {
		return console.log('Nothing happened :)');
	}

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
	console.error(`${chalk.red('[fatal error]')} ${error.message}`);
	console.error(error.stack);
	process.exit(1);
}

setup();
