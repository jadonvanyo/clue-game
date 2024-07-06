import { useState, useRef, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TicTacToePlayerSelect from '../components/TicTacToePlayerSelect';
import Board from '../components/Board';

const Room = () => {

    const { user } = useContext(AuthContext); // get the user's username
    const { roomName } = useParams(); // get room name from the URL
    const socket = useRef(null); // socket reference that closes when the page does
    // Track who is assigned each player
    const [playerX, setPlayerX] = useState(null);
    const [playerO, setPlayerO] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [lastPlayer, setLastPlayer] = useState(null);


    // runs when component mounts and room name changes
    useEffect(() => {
        // establish a new Websocket connection using api and room name
        socket.current = new WebSocket(`ws://localhost:8000/ws/room/${roomName}/`);

        // establish event handler for receiving messages
        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            setBoard(data.board); // update board
            setLastPlayer(data.lastPlayer);
            setPlayerX(data.playerX);
            setPlayerO(data.playerO);
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

    useEffect(()=> {
        // only run if there is a playerX or playerO to prevent running at program start
        if ((playerX || playerO) && board) {
            console.log(playerX, playerO);
            console.log(board);
            socket.current.send(JSON.stringify({ 
                board: board,
                lastPlayer: null,
                playerX: playerX ? playerX : null, // send null if no playerX
                playerO: playerO ? playerO : null // send null if no playerO
            }));
        }
    }, [playerX, playerO])

    const handleSelect = (choice) => {
        if (choice === 'X') {
            if (playerO === user.user_id) {
                setPlayerO(null);
            }
            setPlayerX(user.user_id);
        } else if (choice === 'O') {
            if (playerX === user.user_id) {
                setPlayerX(null);
            }
            setPlayerO(user.user_id);
        }
    };

    // Check if both players have made their selections
    const bothPlayersSelected = playerX && playerO;

    return (
        <div>
        {!bothPlayersSelected ? (
            <TicTacToePlayerSelect onSelect={handleSelect} playerX={playerX} playerO={playerO}/>
        ) : (
            <Board playerX={playerX} playerO={playerO} lastPlayer={lastPlayer} board={board} socket={socket.current} user={user}/>
        )}
        </div>
    );
};

export default Room;