'use strict';

const test = require('ava');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const agentFixtures = require('./agent.fixture');

const config = {
	logging: () => {}
};

let db = null;
let sandbox = null;
const MetricStub = {
	belongsTo: sinon.spy()
};
const single = Object.assign({}, agentFixtures.single);
const id = 1;
let AgentStub = null;

test.beforeEach(async () => {
	sandbox = sinon.sandbox.create();
	AgentStub = {
		hasMany: sandbox.spy()
	};
	const setupDatabase = proxyquire('../../', {
		'./models/agent': () => AgentStub,
		'./models/metric': () => MetricStub
	});
	db = await setupDatabase(config);
});

test.afterEach(() => {
	sandbox && sinon.sandbox.restore();
});

test('Agent', t => {
	t.truthy(db.Agent, 'Agent service should exist');
});

test.serial('Setup', t => {
	t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed');
	t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the model');
	t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was excuted');
	t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the model');
});

test.serial('Agent#findById', async t => {
	const agent = await db.Agent.findById(id);

	t.deepEqual(agent, agentFixtures.byId(id), 'should be the same');
});
