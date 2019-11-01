const fs = require("fs");
const path = require("path");


function getUsers(usersRoot = "users") {
	usersRoot = path.resolve(__dirname, usersRoot);
	return fs.readdirSync(usersRoot).map((item) => {
		const filePath = path.join(usersRoot, item);
		const [filename, ext] = item.split(".");

		return {
			username: filename,
		};
	});
}

function testPerformance(title, count, callback) {
	const now = Date.now();

	for (let i = 0; i < count; i++) {
		callback();
	}

	console.log(`${title}: ${Date.now() - now} ms`);
}

function testUsersPerformance(methodName, callback) {
	const users = getUsers();
	console.log(`Performance testing: "${methodName}"\n`);

	users.forEach(({ username }) => {
		const method = require(`./users/${username}.js`)[methodName];
		if (!method) return;

		testPerformance(username, 1000000, callback(method));

	});

	console.log("")
}



exports.testPerformance = testPerformance;
exports.testUsersPerformance = testUsersPerformance;
exports.getUsers = getUsers;