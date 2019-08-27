import selects
import jsbin

import utils
import esprima

print(dir(esprima.esprima))
exit()

# solution = jsbin.get_solution("https://jsbin.com/lixazat/edit?js,console")
# print(solution)

# posts = selects.select_all_posts.cache()
# jsbin_messages = selects.select_all_jsbin_messages.cache()

# for post in posts:
# 	pass


# from pyjsparser import parse
# parsed = parse(solution)
parsed = esprima.parse(solution)

utils.save_local(esprima.toDict(parsed), "parsed.json")

