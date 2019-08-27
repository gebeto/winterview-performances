import json


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


	def type_ReturnStatement(self, ast, deep):
		return "return {};".format(
			self.proc(ast["argument"], deep)
		)


	def type_AssignmentExpression(self, ast, deep):
		return "{} {} {}".format(
			self.proc(ast["left"], deep),
			ast.get("operator", "="),
			self.proc(ast["right"], deep),
		)


	def type_ExpressionStatement(self, ast, deep):
		return "{};\n".format(
			self.proc(ast["expression"], deep),
		)


	def type_MemberExpression(self, ast, deep):
		return "{}.{}".format(
			self.proc(ast["object"], deep),
			self.proc(ast["property"], deep),
		)

	def type_CallExpression(self, ast, deep):
		return "{}({})".format(
			self.proc(ast["callee"], deep),
			", ".join([self.proc(arg, deep) for arg in ast["arguments"]]),
			# "    " * (deep - 1),
		)

	def type_ArrayExpression(self, ast, deep):
		return "[{}]".format(
			", ".join([self.proc(el, deep) for el in ast["elements"]])
		)

	def type_BinaryExpression(self, ast, deep):
		return "{_left} {_operator} {_right}".format(
			_left = self.proc(ast["left"], deep),
			_operator = ast["operator"],
			_right = self.proc(ast["right"], deep),
		)

	def type_BlockStatement(self, ast, deep):
		start_space = "    "
		space = start_space * deep
		body = space + space.join([self.proc(item, deep + 1) for item in ast["body"]])
		return "{\n" + body + "\n" + (start_space * (deep - 1)) + "}" + ("\n\n" if deep == 1 else "")


	def type_FunctionDeclaration(self, ast, deep):
		if ast.get("expression") == True:
			s = "var {_identifier} = {_async}function({_params}) {_body}"
		else:
			s = "{_async}function {_identifier}({_params}) {_body}"

		return s.format(
			_async = "async " if ast.get("async") else "",
			_identifier = self.proc(ast["id"], deep),
			_params = ", ".join([self.proc(p, deep) for p in ast["params"]]),
			_body = self.proc(ast["body"], deep),
		)

	def type_FunctionExpression(self, ast, deep):
		s = "{_async}function({_params}) {_body}"
		
		return s.format(
			_async = "async " if ast.get("async") else "",
			_params = ", ".join([self.proc(p, deep) for p in ast["params"]]),
			_body = self.proc(ast["body"], deep),
		)


	def type_Program(self, ast, deep):
		return "".join([self.proc(b, deep) for b in ast["body"]])


# CallExpression



def generate(ast):
	return AST(ast).generate()



# print(generate({
# 	"type": "Identifier",
# 	"name": "test"
# }))

# ast = json.load(open("ast.json"))
ast = json.load(open("__cache__/parsed.json"))

print(generate(ast))