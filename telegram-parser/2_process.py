import selects
import jsbin

import utils


msgs = selects.select_all_jsbin_messages.cache()
msg = msgs[3]
print(msg)

# solution = jsbin.get_solution("https://jsbin.com/lixazat/edit?js,console")
solution = jsbin.get_solution(msg["jsbin"])
print(solution)
