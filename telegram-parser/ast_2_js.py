ast = {
	"type": "BlockStatement",
	"body": [
		{
			"type": "ExpressionStatement",
			"expression": {
				"type": "AssignmentExpression",
				"operator": "=",
				"left": {
					"type": "MemberExpression",
					"computed": False,
					"object": {
						"type": "Identifier",
						"name": "module"
					},
					"property": {
						"type": "Identifier",
						"name": "exports"
					}
				},
				"right": {
					"type": "Identifier",
					"name": "test"
				}
			}
		},
		{
			"type": "ExpressionStatement",
			"expression": {
				"type": "AssignmentExpression",
				"operator": "=",
				"left": {
					"type": "MemberExpression",
					"computed": False,
					"object": {
						"type": "Identifier",
						"name": "module"
					},
					"property": {
						"type": "Identifier",
						"name": "exports"
					}
				},
				"right": {
					"type": "Identifier",
					"name": "test2"
				}
			}
		},

		{
			"type": "VariableDeclaration",
			"declarations": [
				{
					"type": "VariableDeclarator",
					"id": {
						"type": "Identifier",
						"name": "a"
					},
					"init": {
						"type": "Literal",
						"value": 10,
						"raw": "10"
					}
				}
			],
			"kind": "const"
		},

		{
			"type": "BlockStatement",
			"body": [
				{
					"type": "VariableDeclaration",
					"declarations": [
						{
							"type": "VariableDeclarator",
							"id": {
								"type": "Identifier",
								"name": "a"
							},
							"init": {
								"type": "Literal",
								"value": 10,
								"raw": "10"
							}
						}
					],
					"kind": "const"
				},
			]
		},

		{
			"type": "BlockStatement",
			"body": [
				{
					"type": "VariableDeclaration",
					"declarations": [
						{
							"type": "VariableDeclarator",
							"id": {
								"type": "Identifier",
								"name": "a"
							},
							"init": {
								"type": "Literal",
								"value": 10,
								"raw": "10"
							}
						}
					],
					"kind": "const"
				},
			]
		}
	]
}


class AST(object):
	def __init__(self, ast):
		self.ast = ast

	def generate(self):
		proc = self.get_proc(self.ast)
		return proc(self.ast, 1)

	def proc(self, ast, deep):
		return self.get_proc(ast)(ast, deep)

	def get_proc(self, ast):
		key = "type_{}".format(ast["type"])
		if hasattr(self, key):
			return getattr(self, key)
		raise Exception("Type {} not found.".format(ast["type"]))


	def type_Identifier(self, ast, deep):
		return ast["name"]

	def type_Literal(self, ast, deep):
		return ast["raw"]


	def type_VariableDeclaration(self, ast, deep):
		declarations = ", ".join([self.proc(item, deep) for item in ast["declarations"]])
		return "{} {};\n".format(ast["kind"], declarations)

	def type_VariableDeclarator(self, ast, deep):
		return "{} = {}".format(
			self.proc(ast["id"], deep),
			self.proc(ast["init"], deep),
		)


	def type_AssignmentExpression(self, ast, deep):
		operator = ast["operator"]
		return "{} = {}".format(
			self.proc(ast["left"], deep),
			self.proc(ast["right"], deep),
		)


	def type_ExpressionStatement(self, ast, deep):
		return "{};\n".format(
			self.proc(ast["expression"], deep),
		)


	def type_MemberExpression(self, ast, deep):
		computed = ast["computed"]
		return "{}.{}".format(
			self.proc(ast["object"], deep),
			self.proc(ast["property"], deep),
		)


	def type_BlockStatement(self, ast, deep):
		print(deep)
		start_space = "    "
		space = start_space * deep
		body = space + space.join([self.proc(item, deep + 1) for item in ast["body"]])
		return "{\n" + body + (start_space * (deep - 1)) + "}\n"



def generate(ast):
	return AST(ast).generate()



# print(generate({
# 	"type": "Identifier",
# 	"name": "test"
# }))


print(generate(ast))