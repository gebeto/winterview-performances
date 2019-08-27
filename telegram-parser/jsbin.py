import re
import requests

url_regex = re.compile(r"https:\/\/jsbin\.com\/[\w\W]+?\/")

null = None
false = False
true = True
document = None
this = None

def start(obj, *args, **kwargs):
	return obj


def parse_jsbin(url):
	headers = { "referer": url }
	response = requests.get('https://jsbin.com/bin/start.js', headers=headers)
	return response.text


def get_solution(url):
	res = parse_jsbin(url)
	res = res.strip()
	res = "".join(res.rsplit(";", 1))

	res = eval(res)

	return res["javascript"]