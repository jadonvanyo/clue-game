import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
    const { roomName } = useParams(); // get room name from the URL
    const [color, setColor] = useState('white'); // set up the initial background color
    const socket = useRef(null); // socket reference that closes when the page does

    // runs when component mounts and room name changes
    useEffect(() => {
        // establish a new Websocket connection using api and room name
        socket.current = new WebSocket(`ws://localhost:8000/ws/room/${roomName}/`);

        // establish event handler for receiving messages
        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setColor(data.color); // update background color
        };

        // event handler for closing websocket
        socket.current.onclose = () => {
            console.log('WebSocket closed');
        };

        // event handler for errors connecting to the websocket
        socket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // cleanup to close the websocket when the component unmounts or room name changes
        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [roomName]);

    // send message to websocket to change the color of the background
    const changeColor = (newColor) => {
        setColor(newColor);
        socket.current.send(JSON.stringify({ color: newColor })); // send new color to the server
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