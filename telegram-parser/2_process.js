const esprima = require("esprima");
const escodegen = require("escodegen");
const prettier = require("prettier");
const fs = require("fs")


// const parsed = esprima.parse(`
// module.maxGoods = function maxGoods() {
// 	return 1;
// }
// `);

const parsed = esprima.parse(`
var a = 10;
`);

console.log(JSON.stringify(parsed, null, 2))

// fs.writeFileSync("test.json", JSON.stringify(parsed, null, 2));








// const data = JSON.parse(fs.readFileSync("__cache__/parsed.json"));
// data.body = data.body.filter(item => item.type !== 'ExpressionStatement');

// data.body.push({
// 	"type": "ExpressionStatement",
// 	"expression": {
// 		"type": "AssignmentExpression",
// 		"operator": "=",
// 		"left": {
// 			"type": "MemberExpression",
// 			"computed": false,
// 			"object": {
// 				"type": "Identifier",
// 				"name": "module"
// 			},
// 			"property": {
// 				"type": "Identifier",
// 				"name": "exports"
// 			}
// 		},
// 		"right": {
// 			"type": "Identifier",
// 			"name": data.body[0].id.name
// 		}
// 	}
// })

// const code = escodegen.generate(data);
// const formattedCode = prettier.format(code, { semi: true, parser: 'babel' });
// console.log(formattedCode);