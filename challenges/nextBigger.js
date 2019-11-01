const { expect } = require('../utils');

function nextBigger(solution) {
	// expect(solution(1234567890), 1234567908);
	expect(solution(1111), -1);
	expect(solution(1112), 1121);
}

nextBigger.iterationsCount = 100000;

module.exports = nextBigger;