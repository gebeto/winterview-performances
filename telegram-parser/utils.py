import json
import os


CACHE_ROOT = "__cache__"


class cached():
	def __call__(self, function):
		def wrapper(*args, **kwargs):
			result = function(*args, **kwargs)
			save_local(result, self.file_path)
			return result

		def cache():
			return load_local(self.file_path)

		setattr(wrapper, "cache", cache)

		return wrapper

	def __init__(self, file_path):
		self.file_path = file_path


def load_local(file_path):
	_file_path = os.path.join(CACHE_ROOT, file_path)
	if os.path.exists(_file_path):
		return json.load(open(_file_path))
	return False


def save_local(data, file_path):
	if not os.path.exists(CACHE_ROOT):
		os.mkdir(CACHE_ROOT)
	_file_path = os.path.join(CACHE_ROOT, file_path)
	json.dump(data, open(_file_path, "w"), indent=4, ensure_ascii=False)
