'use strict';

const mosca = require('mosca');
const redis = require('redis');
const chalk = require('chalk');

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

server.on('ready', () => {
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
