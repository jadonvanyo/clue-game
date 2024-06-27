import React, { useState, useEffect, useRef } from 'react';

const Room = () => {
  const [color, setColor] = useState('white');
  const [room, setRoom] = useState('');
  const socket = useRef(null);

  const joinRoom = (roomName) => {
    if (socket.current) {
      socket.current.close();
    }

    socket.current = new WebSocket(`ws://localhost:8000/ws/room/${roomName}/`);

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setColor(data.color);
    };

    socket.current.onclose = () => {
      console.log('WebSocket closed');
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const changeColor = (newColor) => {
    setColor(newColor);
    socket.current.send(JSON.stringify({ color: newColor }));
  };

  return (
    <div>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter room name"
      />
      <button onClick={() => joinRoom(room)}>Join Room</button>

      <div style={{ backgroundColor: color, height: '100vh' }}>
        <button onClick={() => changeColor('red')}>Red</button>
        <button onClick={() => changeColor('blue')}>Blue</button>
        <button onClick={() => changeColor('green')}>Green</button>
      </div>
    </div>
  );
};

export default Room;