import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/JoinRoom.css";

export default function JoinGame() {
    const [room, setRoom] = useState('');
    const navigate = useNavigate(); // Set navigate

    const handleClick = () => {
        navigate(`/room/${room}`);
    };

    return (
        <div className="join-room-container">
            <label htmlFor="joingameinput" className="join-room-label">Join Game:</label>
            <input
                className="join-room-input"
                type="text"
                id="joingameinput"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room name"
            />
            <button className="join-room-button" onClick={handleClick}>Join Room</button>
        </div>
    )
}