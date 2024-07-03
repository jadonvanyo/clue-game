import Square from "./Square";
import "../styles/Board.css"
import { useContext, useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Board() {
    const { user } = useContext(AuthContext); // get the user's username
    const { roomName } = useParams(); // get room name from the URL
    const socket = useRef(null); // socket reference that closes when the page does
    const [player, setPlayer] = useState(null);
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
            setSquares(data.board); // update board
            setTurn(data.player === "X" ? "O" : "X");
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

    const calculateWinner = (squares) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }

    const checkIfFilled = () => {
        let filled = true;
        squares.forEach((square) =>{
            if (!square) {
                filled = false;
            }
        });

        return filled;
    }

    const handleClick = (i) => {
        if (turn !== player || squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquare = squares.slice();
        nextSquare[i] = player;
        
        setSquares(nextSquare);
        
        socket.current.send(JSON.stringify({ 
            board: nextSquare,
            player: player
        })); // send new squares and who played them to server
    }

    const resetGame = () => {
        const emptySquares = Array(9).fill(null);

        socket.current.send(JSON.stringify({ 
            board: emptySquares,
            player: player
        })); // send reset squares and who reset them to server

    }

    const setX = () => {
        setPlayer("X");
        console.log(player);
    }

    const setO = () => {
        setPlayer("O");
        console.log(player);
    }

    const winner = calculateWinner(squares);
    const filled = checkIfFilled();
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (filled) {
        status = "Tie";
    } else {
        status = "Next player: " + (turn === "X" ? "X" : "O");
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
            {winner || filled ?
                <button onClick={resetGame}>Reset</button> : null
            }
            {!player ?
                <>
                    <button onClick={setX}>X</button> 
                    <button onClick={setO}>O</button>
                </> : null
            }
        </>
    );
}