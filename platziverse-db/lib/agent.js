'use strict';

module.exports = function (AgentModel) {
	function findById(id) {
		return AgentModel.findById(id);
	}

	return {
		findById
	};
};
