'use strict';

module.exports = function setupMetric(MetricModel, AgentModel) {

	async function create(uuid, metric) {
		const agent = await AgentModel.findByUuid(uuid);

		if (agent) {
			Object.assign(metric, {agentId: agent.id});
			const result = MetricModel.create(metric);
			return result.toJSON();
		}
	}

	async function findByAgentUuid(uuid) {
		return MetricModel.findAll({
			attributes: ['type'],
			group: ['type'],
			include: [{
				attributes: [],
				model: 'AgentModel',
				where: {
					uuid
				}
			}],
			raw: true
		});
	}

	async function findByTypeAgentUuid(type, uuid) {
		return MetricModel.findAll({
			attributes: ['id', 'type', 'value', 'createdAt'],
			where: {
				type
			},
			limit: 20,
			order: [['createdAd', 'DESC']],
			include: [{
				attributes: [],
				model: 'AgentModel',
				where: {
					uuid
				}
			}],
			raw: true
		});
	}

	return {
		create,
		findByAgentUuid,
		findByTypeAgentUuid
	};
};
