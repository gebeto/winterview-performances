const { getUsers, testPerformance, testUsersPerformance } = require('./utils');


testUsersPerformance("short", (method) => () => {
	method([1, 2, 3, 4, 5, 6]);
	method([1, 2, 3, 5, 6, 8]);
	method([-3, -2, -1, 1, 2, 3]);
});
