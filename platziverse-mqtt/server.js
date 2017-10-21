'use strict';

const debug = require('debug');
const mosca = require('mosca');
const redis = require('redis');
const chalk = require('chalk');
const db = require('platziverse-db');

const config = {
  database: process.env.DB_NAME || 'platziverse',
  usernmae: process.env.DB_USER || 'platzi',
  password: process.env.DB_PASS || 'platzi',
  host: process.env.DBHOST || 'localhost',
  dialect: 'postgres',
  logging: s => debug(s)
};

const backend = {
  type: 'redis',
  redis,
  return_buffers: true
};

const settings = {
  port: 1883,
  backend
};

const server = new mosca.Server(settings);

let Agent, Metric;

server.on('ready', async () => {
  const services = await db(config).catch(handleFatalError);

  Agent = services.Agent;
  Metric = services.Metric;

  console.log(`${chalk.green('[platziverse-mqtt]')} server is running`);

});

server.on('clientConnected', (client) => {
  console.log(`Client Connected: ${client.id}`);
});

server.on('clientDisconnected', (client) => {
  console.log(`Client Diconnected: ${client.id}`);
});

server.on('published', (packet, client) => {
  console.log(`Received: ${packet.topic}`);
  console.log(`Payload: ${packet.payload}`);
});


const handleFatalError = function(err) {
  console.error(`${chalk.red('[faltal error]')} ${err.message}`);
  console.error(`${err.stack}`);
  process.exit(1);
};

server.on('error', handleFatalError);
process.on('uncaughtException', handleFatalError);
process.on('unhanledRejection', handleFatalError);
