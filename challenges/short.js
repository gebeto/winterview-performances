function short(solution) {
	solution([1, 2, 3, 4, 5, 6]);
	solution([1, 2, 3, 5, 6, 8]);
	solution([-3, -2, -1, 1, 2, 3]);
}

short.iterationsCount = 1000000;

module.exports = short;