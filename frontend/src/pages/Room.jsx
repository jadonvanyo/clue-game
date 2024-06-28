import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
    const { roomName } = useParams();
    const [color, setColor] = useState('white');
    const socket = useRef(null);

    useEffect(() => {
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

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [roomName]);


    const changeColor = (newColor) => {
        setColor(newColor);
        socket.current.send(JSON.stringify({ color: newColor }));
    };

  return (
        <div>
            <div style={{ backgroundColor: color, height: '100vh' }}>
                <button onClick={() => changeColor('red')}>Red</button>
                <button onClick={() => changeColor('blue')}>Blue</button>
                <button onClick={() => changeColor('green')}>Green</button>
            </div>
        </div>
  );
};

export default Room;