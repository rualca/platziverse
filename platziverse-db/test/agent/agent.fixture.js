'use strict';

const agent = {
	id: 1,
	uuid: 'yyyy-yyy-yyy',
	name: 'fixture',
	username: 'platzi',
	hostname: 'test-host',
	pid: 0,
	connected: true,
	createdAt: new Date(),
	updatedAt: new Date()
};

const agents = [
	agent,
	extend({
		id: 2,
		uuid: 'yyyy-yyy-yyw',
		connected: false,
		username: 'test'
	}),
	extend({
		id: 3,
		uuid: 'yyyy-yyy-yyx'
	}),
	extend({
		id: 4,
		uuid: 'yyyy-yyy-yyz'
	})
];

function extend(obj, values) {
	const clone = Object.assign({}, obj);
	return Object.assign(clone, values);
}

module.exports = {
	single: agent,
	all: agents,
	connected: agents.filter(a => a.connected),
	platzi: agents.filter(a => a.username === 'platzi'),
	byUuid: id => agents.filter(a => a.uuid === id).shift(),
	byId: id => agents.filter(a => a.id === id).shift()
};
