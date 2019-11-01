const { testUsersPerformance } = require('./utils');

const chellengeName = process.argv[process.argv.length - 1];
testUsersPerformance(chellengeName);