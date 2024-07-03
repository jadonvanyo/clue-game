import json
from channels.generic.websocket import AsyncWebsocketConsumer

class RoomConsumer(AsyncWebsocketConsumer):
    """handle websocket connections for specific rooms

    Args:
        AsyncWebsocketConsumer: base class to handle asynchronous websocket
    """
    # Store the current state of the room
    room_state = {}
    
    # Called when a websocket connection is established
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
        
        # Send the current state to the new client
        current_board = self.room_state.get(self.room_name, [None] * 9)
        await self.send(text_data=json.dumps({
            'board': current_board
        }))

    # Leave room group
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # handle message received from individual client
    async def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        board = data['board']
        last_player = data['lastPlayer']
        player_x = data['playerX']
        player_o = data['playerO']
        
        # Update the room's state in the state dictionary
        self.room_state[self.room_name] = board

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'change_board',
                'board': board,
                'lastPlayer': last_player,
                'playerX': player_x,
                'playerO': player_o
            }
        )

    # send message to a specified group
    async def change_board(self, event):
        board = event['board']
        last_player = event['lastPlayer']
        player_x = event['playerX']
        player_o = event['playerO']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'board': board,
            'lastPlayer': last_player,
            'playerX': player_x,
            'playerO': player_o
        }))