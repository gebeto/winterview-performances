const { expect } = require('../utils');

function nextBigger(solution) {
	expect(solution(12), 21)
	expect(solution(2017), 2071)
	expect(solution(513), 531)
	expect(solution(144), 414)
	// expect(solution(123456789), 123456798)
}

nextBigger.iterationsCount = 100000;

module.exports = nextBigger;