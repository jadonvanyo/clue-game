import Square from "../components/Square";
import { useState } from "react";
import "../styles/Home.css"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [squares, setSquares] = useState(["X", "O", null, "X", null, null, "O", null, null]);
    const [turn, setTurn] = useState("X");
    const navigate = useNavigate(); // Set navigate

    const handleClick = (i) => {
        const nextSquare = squares.slice();
        nextSquare[i] = turn === "X" ? "X" : "O";
        setTurn(turn === "X" ? "O" : "X");
        
        setSquares(nextSquare);
    }

    const handlePlayGame = () => {
        navigate("/joingame");
    }

    return (
        <>
            <div className="hero">

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

                <p>Welcome to Online Games, a place where you and all your friends can get together to play games!</p>
                <button className="play-button" onClick={handlePlayGame}>Play Now</button>
            </div>

            <div className="features">
                <div className="feature">
                    <h3>Multiplayer</h3>
                    <p>Challenge your friends to a game online.</p>
                </div>

                <div className="feature">
                    <h3>Group Party</h3>
                    <p>Your whole squad can join a room to watch the game.</p>
                </div>
                
                <div className="feature">
                    <h3>Leaderboards</h3>
                    <p>Coming Soon: Brag to your friends about how many times you have beaten them.</p>
                </div>

                <div className="feature">
                    <h3>More Games!</h3>
                    <p>Coming Soon: More games to play with your friends!</p>
                </div>
            </div>
        </>
        
    );
};

export default Home;