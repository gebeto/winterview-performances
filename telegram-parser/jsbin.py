import re


url_regex = re.compile(r"https:\/\/jsbin\.com\/[\w\W]+?\/")


def parse_jsbin(jsbin):
	headers = { "referer": "https://jsbin.com/cusunitila/edit" }
	response = requests.get('https://jsbin.com/bin/start.js', headers=headers)
	return response.content
