import json
from channels.generic.websocket import AsyncWebsocketConsumer

class RoomConsumer(AsyncWebsocketConsumer):
    """handle websocket connections for specific rooms

    Args:
        AsyncWebsocketConsumer: base class to handle asynchronous websocket
    """
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name'] # extract room name from the url route parameters
        self.room_group_name = f'chat_{self.room_name}' # construct a group name using the room name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # accept websocket connection
        await self.accept()

    # Leave room group
    async def disconnect(self, close_code):
        # 
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # handle message received from the client
    async def receive(self, text_data):
        data = json.loads(text_data)
        color = data['color']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'change_color',
                'color': color
            }
        )

    # send message to a specified group
    async def change_color(self, event):
        color = event['color']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'color': color
        }))