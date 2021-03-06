'use strict';

module.exports = function (AgentModel) {
	function findById(id) {
		return AgentModel.findById(id);
	}
	async function createOrUpdate(agent) {
		const cond = {
			where: {
				uuid: agent.uuid
			}
		};

		const existingAgent = await AgentModel.findOne(cond);

		if (existingAgent) {
			const updated = await AgentModel.update(agent, cond);
			return updated ? AgentModel.findOne(cond) : existingAgent;
		}

		const result = AgentModel.create(agent);
		return result.toJSON();
	}

	function findByUuid(uuid) {
		return AgentModel.findOne({
			where: {
				uuid
			}
		});
	}

	function findAll() {
		return AgentModel.findAll();
	}

	function findAllConnected() {
		return AgentModel.findAll({
			where: {
				connected: true
			}
		});
	}

	function findConnectedByUsername(username) {
		return AgentModel.findAll({
			where: {
				username,
				connected: true
			}
		});
	}

	return {
		createOrUpdate,
		findById,
		findByUuid,
		findAll,
		findAllConnected,
		findConnectedByUsername
	};
};
