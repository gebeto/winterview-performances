from datetime import datetime

import utils
import jsbin


@utils.cached("posts.json")
def select_all_posts(messages):
	posts = [{
		"message_id": m.id,
		"message": m.message,
		"date": m.date.toordinal(),
	} for m in messages
		if m.fwd_from
		and m.fwd_from.channel_id == 1434352936
	]
	return posts


@utils.cached("jsbin_messages.json")
def select_all_jsbin_messages(messages, members):
	result = []

	for message in messages:
		if not message.message: continue
		reged = jsbin.url_regex.findall(message.message)
		for reg in reged:
			result.append({
				"message_id": message.id,
				"user_id": message.from_id,
				"date": message.date.toordinal(),
				"reply_to": message.reply_to_msg_id if hasattr(message, "reply_to_msg_id") else None,
				"username": members.get(message.from_id, message.from_id),
				"jsbin": reg
			})

	return result