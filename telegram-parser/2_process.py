import selects


posts = selects.select_all_posts.cache()
jsbin_messages = selects.select_all_jsbin_messages.cache()

print(posts)
print(jsbin_messages)