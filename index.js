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

function testUsersPerformance(callback) {
	const users = getUsers();

	users.forEach(({ username }) => {
		const method = require(`./users/${username}.js`)["short"];
		if (!method) return;

		testPerformance(username, 1000000, callback(method));

	});
}


testUsersPerformance((method) => () => {
	method([1, 2, 3, 4, 5, 6]);
	method([1, 2, 3, 5, 6, 8]);
	method([-3, -2, -1, 1, 2, 3]);
});
