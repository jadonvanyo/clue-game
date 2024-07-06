import Square from "./Square";
import "../styles/TicTacToeBoard.css"
import { useState, useEffect } from 'react';

export default function Board({ playerX, playerO, lastPlayer, board, socket, user}) {
    const [turn, setTurn] = useState(playerX);
    const [squares, setSquares] = useState(Array(9).fill(null));

    useEffect(() => {
        setSquares(board); // update board
        setTurn(lastPlayer === playerX ? playerO : playerX);
    }, [board]);

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
        const currentPlayer = lastPlayer === playerX ? playerO : playerX;
        if (turn !== user.user_id || squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquare = squares.slice();
        nextSquare[i] = turn === playerX ? "X" : "O";
        
        setSquares(nextSquare);
        
        socket.send(JSON.stringify({ 
            board: nextSquare,
            lastPlayer: currentPlayer,
            playerX: playerX,
            playerO: playerO
        })); // send new squares and who played them to server
    }

    const resetGame = () => {
        const emptySquares = Array(9).fill(null);

        socket.send(JSON.stringify({ 
            board: emptySquares,
            lastPlayer: turn,
            playerX: playerX,
            playerO: playerO
        })); // send reset squares and who reset them to server

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
        </>
    );
}