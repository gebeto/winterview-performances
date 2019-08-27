from telethon import TelegramClient, types

import asyncio
import os

from selects import select_all_posts, select_all_jsbin_messages


channel = types.PeerChannel(1356980101)

api_id = os.environ["APP_ID"]
api_hash = os.environ["APP_HASH"]


async def get_all_messages(client, channel):
	return await client.get_messages(channel, limit = 10000)

async def get_all_members(client, channel):
	participants = await client.get_participants(channel)
	members = {p.id: p.username for p in participants}
	return members


async def main():
	messages = await get_all_messages(client, channel)
	members = await get_all_members(client, channel)
	
	select_all_posts(messages)
	select_all_jsbin_messages(messages, members)


if __name__ == '__main__':
	client = TelegramClient('session', api_id, api_hash)
	client.start()

	loop = asyncio.get_event_loop()
	loop.run_until_complete(main())
