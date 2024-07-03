import { useState, useRef, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import TicTacToePlayerSelect from '../components/TicTacToePlayerSelect';
// import GameBoard from './GameBoard';

const TicTacToePlayerSelect = ({ onSelect }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handleSelect = (choice) => {
        setSelectedPlayer(choice);
        onSelect(choice);
    };

    return (
        <div>
            <h2>Select Your Player</h2>
            <button onClick={() => handleSelect('X')}>Play as X</button>
            <button onClick={() => handleSelect('O')}>Play as O</button>
            {selectedPlayer && <p>You selected: {selectedPlayer}</p>}
        </div>
    );
};

const Room = () => {

    const { user } = useContext(AuthContext); // get the user's username
    const { roomName } = useParams(); // get room name from the URL
    const socket = useRef(null); // socket reference that closes when the page does
    const [playerX, setPlayerX] = useState("");
    const [playerO, setPlayerO] = useState("");
    const [turn, setTurn] = useState("X");
    const [squares, setSquares] = useState(Array(9).fill(null));

    // runs when component mounts and room name changes
    useEffect(() => {
        // establish a new Websocket connection using api and room name
        socket.current = new WebSocket(`ws://localhost:8000/ws/room/${roomName}/`);

        // establish event handler for receiving messages
        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            const board = data.board; // update board
            const lastPlayer = data.lastPlayer;
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
        console.log(playerX, playerO)
        // socket.current.send(JSON.stringify({ 
        //     board: null,
        //     lastPlayer: null,
        //     playerX: playerX,
        //     playerO: playerO
        // }));
    }, [playerX, playerO])

    const handleSelect = async (choice) => {
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
            <TicTacToePlayerSelect onSelect={handleSelect}/>
        ) : (
            null
            // <GameBoard playerX={playerX} playerO={playerO} />
        )}
        </div>
    );
};

export default Room;