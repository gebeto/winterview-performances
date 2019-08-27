import selects


posts = selects.select_all_posts.cache()
jsbin_messages = selects.select_all_jsbin_messages.cache()

for post in posts:
	pass

posts
jsbin_messages