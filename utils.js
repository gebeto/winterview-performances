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

function getChallenges(challengesRoot = "challenges") {
	challengesRoot = path.resolve(__dirname, challengesRoot);
	return fs.readdirSync(challengesRoot).map((item) => {
		const filePath = path.join(challengesRoot, item);
		const [filename, ext] = item.split(".");

		return {
			challenge: filename,
		};
	}).reduce((curr, item) => ({...curr, [item.challenge]: require(`./challenges/${item.challenge}`)}), {});
}

function testPerformance(title, count, callback) {
	const now = Date.now();

	for (let i = 0; i < count; i++) {
		callback();
	}

	console.log(`${title}: ${Date.now() - now} ms`);
}

function testUsersPerformance(challengeName) {
	const users = getUsers();
	const challenges = getChallenges();
	const challenge = challenges[challengeName];
	if (!challenge) {
		return;
	}
	const iterationsCount = challenge.iterationsCount || 1000000;
	console.log(`Performance testing: "${challengeName}"\nIterations count: ${iterationsCount}\n`);

	users.forEach(({ username }) => {
		const userChallengeSolution = require(`./users/${username}.js`)[challengeName];
		if (!userChallengeSolution) return;

		testPerformance(username, iterationsCount, () => challenge(userChallengeSolution));
	});

	console.log("")
}

function expect(value, expectedValue) {
	if (value !== expectedValue) {
		throw new Error(`Expected "${expectedValue}" instead of "${value}"`);
	}
}

exports.expect = expect;
exports.testPerformance = testPerformance;
exports.testUsersPerformance = testUsersPerformance;
exports.getUsers = getUsers;